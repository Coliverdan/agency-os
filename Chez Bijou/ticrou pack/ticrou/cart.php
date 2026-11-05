<?php $head_title = "Cart Page || Ticrou || Ticrou PHP Template" ?>
<?php require_once('parts/layout/top-layout.php'); ?>
<?php require_once('parts/header/header.php'); ?>


<?php
$page_title = "Cart Page";
require_once('parts/page-title.php');
?>




<!-- cart section -->
<section class="cart-section p_relative pt_120 pb_120 bg-color-4">
    <div class="auto-container">
        <div class="row clearfix">
            <div class="col-lg-12 col-md-12 col-sm-12 table-column">
                <div class="table-outer">
                    <table class="cart-table">
                        <thead class="cart-header">
                            <tr>
                                <th>&nbsp;</th>
                                <th class="prod-column">Product</th>
                                <th>&nbsp;</th>
                                <th>&nbsp;</th>
                                <th class="price">Price</th>
                                <th class="quantity">Quantity</th>
                                <th>Subtotal</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td colspan="4" class="prod-column">
                                    <div class="column-box">
                                        <div class="remove-btn">
                                            <i class="icon-36"></i>
                                        </div>
                                        <div class="prod-thumb">
                                            <img src="assets/images/shop/cart-1.jpg" alt="">
                                        </div>
                                        <div class="prod-title">
                                            Chicken & Vegetable Fry
                                        </div>
                                    </div>
                                </td>
                                <td class="price">$20.00</td>
                                <td class="qty">
                                    <div class="item-quantity">
                                        <input class="quantity-spinner" type="text" value="1" name="quantity">
                                    </div>
                                </td>
                                <td class="sub-total">$20.00</td>
                            </tr>
                            <tr>
                                <td colspan="4" class="prod-column">
                                    <div class="column-box">
                                        <div class="remove-btn">
                                            <i class="icon-36"></i>
                                        </div>
                                        <div class="prod-thumb">
                                            <img src="assets/images/shop/cart-2.jpg" alt="">
                                        </div>
                                        <div class="prod-title">
                                            Penne pasta with meatball
                                        </div>
                                    </div>
                                </td>
                                <td class="price">$25.00</td>
                                <td class="qty">
                                    <div class="item-quantity">
                                        <input class="quantity-spinner" type="text" value="1" name="quantity">
                                    </div>
                                </td>
                                <td class="sub-total">$25.00</td>
                            </tr>
                            <tr>
                                <td colspan="4" class="prod-column">
                                    <div class="column-box">
                                        <div class="remove-btn">
                                            <i class="icon-36"></i>
                                        </div>
                                        <div class="prod-thumb">
                                            <img src="assets/images/shop/cart-3.jpg" alt="">
                                        </div>
                                        <div class="prod-title">
                                            Fried eggs sandwiches
                                        </div>
                                    </div>
                                </td>
                                <td class="price">$23.00</td>
                                <td class="qty">
                                    <div class="item-quantity">
                                        <input class="quantity-spinner" type="text" value="1" name="quantity">
                                    </div>
                                </td>
                                <td class="sub-total">$23.00</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        <div class="othre-content clearfix">
            <div class="coupon-box pull-left clearfix">
                <input type="text" placeholder="Coupon code...">
                <button type="button" class="theme-btn-one">Apply Coupon</button>
            </div>
            <div class="update-btn pull-right">
                <button type="button" class="theme-btn-two">Update Cart</button>
            </div>
        </div>
        <div class="cart-total">
            <div class="row">
                <div class="col-xl-5 col-lg-12 col-md-12 offset-xl-7 cart-column">
                    <div class="total-cart-box clearfix">
                        <h3 class="fs_20 fw_bold lh_30 d_block pb_20">Cart Totals</h3>
                        <ul class="list clearfix mb_30">
                            <li>Subtotal:<span>$20.00</span></li>
                            <li>Total:<span>$20.00</span></li>
                        </ul>
                        <a href="cart.php" class="theme-btn-one">Proceed to Checkout <i class="icon-74"></i></a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>
<!-- cart section end -->


<?php require_once('parts/footer/footer.php'); ?>
<?php require_once('parts/layout/bottom-layout.php'); ?>