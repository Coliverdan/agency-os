<?php $head_title = "Checkout || Ticrou || Ticrou PHP Template" ?>
<?php require_once('parts/layout/top-layout.php'); ?>
<?php require_once('parts/header/header.php'); ?>


<?php
$page_title = "Checkout";
require_once('parts/page-title.php');
?>




<!-- checkout-section -->
<section class="checkout-section">
    <div class="container">
        <div class="row">
            <div class="col-lg-12 col-md-12 col-sm-12 upper-column">
                <div class="upper-box">
                    <div class="coupon single-box">Have a Coupon? <a href="checkbox.php">Click here to enter your code</a></div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-lg-6 col-md-12 col-sm-12 left-column">
                <div class="inner-box">
                    <div class="billing-info">
                        <h4 class="sub-title">Billing Details</h4>
                        <form action="#" method="post" class="billing-form">
                            <div class="row">
                                <div class="col-lg-6 col-md-6 col-sm-12 form-group">
                                    <label>First Name*</label>
                                    <div class="field-input">
                                        <input type="text" name="first_name">
                                    </div>
                                </div>
                                <div class="col-lg-6 col-md-6 col-sm-12 form-group">
                                    <label>Last Name*</label>
                                    <div class="field-input">
                                        <input type="text" name="last_name">
                                    </div>
                                </div>
                                <div class="col-lg-12 col-md-12 col-sm-12 form-group">
                                    <label>Company Name*</label>
                                    <div class="field-input">
                                        <input type="text" name="company_name">
                                    </div>
                                </div>
                                <div class="col-lg-12 col-md-12 col-sm-12 form-group">
                                    <label>Email Address*</label>
                                    <div class="field-input">
                                        <input type="email" name="email">
                                    </div>
                                </div>
                                <div class="col-lg-6 col-md-6 col-sm-12 form-group">
                                    <label>Phone Number*</label>
                                    <div class="field-input">
                                        <input type="text" name="phone">
                                    </div>
                                </div>
                                <div class="col-lg-6 col-md-6 col-sm-12 form-group">
                                    <label>Country*</label>
                                    <div class="select-column select-box">
                                        <select class="selectmenu" id="ui-id-1">
                                            <option selected="selected">Select Option</option>
                                            <option>United State</option>
                                            <option>Australia</option>
                                            <option>Canada</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="col-lg-12 col-md-12 col-sm-12 form-group">
                                    <label>Address*</label>
                                    <div class="field-input">
                                        <input type="text" name="address" class="address">
                                        <input type="text" name="address">
                                    </div>
                                </div>
                                <div class="col-lg-12 col-md-12 col-sm-12 form-group">
                                    <label>Town/City*</label>
                                    <div class="field-input">
                                        <input type="text" name="town_city">
                                    </div>
                                </div>
                                <div class="col-lg-6 col-md-6 col-sm-12 form-group">
                                    <label>State*</label>
                                    <div class="select-column select-box">
                                        <select class="selectmenu" id="ui-id-2">
                                            <option selected="selected">Select Option</option>
                                            <option>United State</option>
                                            <option>Australia</option>
                                            <option>Canada</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="col-lg-6 col-md-6 col-sm-12 form-group">
                                    <label>Zip Code*</label>
                                    <div class="field-input">
                                        <input type="text" name="zip">
                                    </div>
                                </div>
                                <div class="form-group col-lg-12 col-md-12 col-sm-12">
                                    <div class="create-acc">
                                        <div class="custom-controls-stacked">
                                            <label class="custom-control material-checkbox">
                                                <input type="checkbox" class="material-control-input">
                                                <span class="material-control-indicator"></span>
                                                <span class="description">Create an Account?</span>
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div class="additional-info">
                        <div class="note-book">
                            <label>Order Notes</label>
                            <textarea name="note_box" placeholder="Notes about your order, e.g. special notes for your delivery"></textarea>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-lg-6 col-md-12 col-sm-12 right-column">
                <div class="inner-box">
                    <div class="order-info">
                        <h4 class="sub-title">Your Order</h4>
                        <div class="order-product">
                            <ul class="order-list clearfix">
                                <li class="title clearfix">
                                    <p>Product</p>
                                    <span>Total</span>
                                </li>
                                <li>
                                    <div class="single-box clearfix">
                                        <img src="assets/images/shop/order-1.jpg" alt="">
                                        <h6>Chicken & Vegetable Fry x 1</h6>
                                        <span>$20.00</span>
                                    </div>
                                </li>
                                <li>
                                    <div class="single-box clearfix">
                                        <img src="assets/images/shop/order-2.jpg" alt="">
                                        <h6>Penne pasta with meatball x 1</h6>
                                        <span>$20.00</span>
                                    </div>
                                </li>
                                <li>
                                    <div class="single-box clearfix">
                                        <img src="assets/images/shop/order-3.jpg" alt="">
                                        <h6>Fried eggs sandwiches x 1</h6>
                                        <span>$20.00</span>
                                    </div>
                                </li>
                                <li class="sub-total clearfix">
                                    <h6>Sub Total</h6>
                                    <span>$60.00</span>
                                </li>
                                <li class="order-total clearfix">
                                    <h6>Order Total</h6>
                                    <span>$60.00</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="payment-info">
                        <h4 class="sub-title">Payment Proccess</h4>
                        <div class="payment-inner">
                            <div class="option-block">
                                <div class="custom-controls-stacked">
                                    <label class="custom-control material-checkbox">
                                        <input type="checkbox" class="material-control-input">
                                        <span class="material-control-indicator"></span>
                                        <span class="description">Create an account?</span>
                                    </label>
                                </div>
                                <p>Please send a check to Store Name, Store Street, Store Town, Store State / County, Store Postcode.</p>
                            </div>
                            <div class="option-block">
                                <div class="custom-controls-stacked">
                                    <label class="custom-control material-checkbox">
                                        <input type="checkbox" class="material-control-input">
                                        <span class="material-control-indicator"></span>
                                        <span class="description">Paypal<a href="checkout.php">What is paypal?</a></span>
                                    </label>
                                </div>
                            </div>
                            <div class="btn-box">
                                <a href="checkout.php" class="theme-btn-one">Place Your Order</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>
<!-- checkout-section end -->


<?php require_once('parts/footer/footer.php'); ?>
<?php require_once('parts/layout/bottom-layout.php'); ?>