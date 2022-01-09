const  catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

// Process stripe payments        => /api/v1/payment/process
exports.processPayment = catchAsyncErrors( async (req, res, next) => {
    // req.params.amount=100;
    const paymentIntent = await stripe.paymentIntents.create({

        amount: req.body.amount,
        currency: 'inr',
        description: 'Software development services',
        metadata: { integration_check: 'accept_a_payment'}
    });
    
    res.status(200).json({
        success: true,
        client_secret: paymentIntent.client_secret,
    });
});

// send stripe api        => /api/v1/stripeapi
exports.sendStripeApi = catchAsyncErrors( async (req, res, next) => {

    res.status(200).json({
        stripeApiKey: process.env.STRIPE_API_KEY 
    });
});