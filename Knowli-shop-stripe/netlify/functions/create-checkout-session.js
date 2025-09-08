const stripe = require("stripe")("sk_test_1234567890"); // Clé secrète test

exports.handler = async (event) => {
  try {
    const { total } = JSON.parse(event.body);

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [{
        price_data: {
          currency: "eur",
          product_data: { name: "Achat Knowli" },
          unit_amount: Math.round(parseFloat(total) * 100),
        },
        quantity: 1,
      }],
      mode: "payment",
      success_url: `${process.env.URL}/success.html`,
      cancel_url: `${process.env.URL}/cancel.html`,
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ id: session.id }),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message }),
    };
  }
};
