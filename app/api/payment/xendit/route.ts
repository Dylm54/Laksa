import { Invoice } from "@/lib/xendit";
import { createClient } from "@/lib/supabase/server";

export async function POST(req: Request) {
  try {
    const supabase = await createClient();

    // Cek user sudah login atau belum
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Ambil id produk dari request
    const { productId } = await req.json();

    // Ambil produk dari supabase
    const { data: product } = await supabase
      .from("products")
      .select("*")
      .eq("id", productId)
      .eq("is_published", true)
      .single();
    console.log("2. product:", product);

    // Stop kalo gaada produknya
    if (!product) {
      return Response.json(
        { error: "Produk tidak ditemukan" },
        { status: 404 }
      );
    }

    // Buat order/pesanan baru
    const { data: order, error: orderError } = await supabase
      .from("orders")
      .insert({
        buyer_id: user.id,
        status: "pending",
        payment_method: "xendit",
        currency: "IDR",
        total_amount: product.price_idr,
      })
      .select()
      .single();
    console.log("3. order:", order);
    console.log("3. orderError:", orderError);

    // Stop kalo gagal buat order
    if (orderError) {
      return Response.json({ error: "Gagal membuat order" }, { status: 500 });
    }

    // Buat order item dari order yang baru dibuat
    await supabase.from("order_items").insert({
      order_id: order.id,
      product_id: productId,
      price_paid: product.price_idr,
    });

    // Buat invoice xendit baru biar dapet payment token
    const invoice = await Invoice.createInvoice({
      data: {
        externalId: order.id,
        amount: product.price_idr,
        payerEmail: user.email!,
        description: product.title,
        successRedirectUrl: `${process.env.NEXT_PUBLIC_URL}/payment/success?order=${order.id}`,
        failureRedirectUrl: `${process.env.NEXT_PUBLIC_URL}/payment/failed`,
        currency: "IDR",
      },
    });

    // Update payment token order dengan id invoice
    await supabase
      .from("orders")
      .update({ payment_token: invoice.id })
      .eq("id", order.id);
    console.log("4. invoice:", invoice);

    // Outputnya url ke page pembayaran xendit dengan isian invoice
    return Response.json({ url: invoice.invoiceUrl });
  } catch (error) {
    console.error("ERROR:", error);
    return Response.json({ error: String(error) }, { status: 500 });
  }
}
