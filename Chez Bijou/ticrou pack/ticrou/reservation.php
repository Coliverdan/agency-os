<?php $head_title = "Reservation || Ticrou || Ticrou PHP Template" ?>
<?php require_once('parts/layout/top-layout.php'); ?>
<?php require_once('parts/header/header.php'); ?>


<?php
$page_title = "Reservation";
require_once('parts/page-title.php');
?>





<!-- order-section -->
<section class="order-section reservation-page bg-color-2">
    <div class="shape">
        <div class="shape-1" style="background-image: url(assets/images/shape/shape-15.png);"></div>
        <div class="shape-2" style="background-image: url(assets/images/shape/shape-16.png);"></div>
        <div class="shape-3" style="background-image: url(assets/images/shape/shape-17.png);"></div>
        <div class="shape-4" style="background-image: url(assets/images/shape/shape-18.png);"></div>
    </div>
    <div class="auto-container">
        <div class="sec-title centred mb_50">
            <span class="sub-title">Table Booking</span>
            <h2>Pre-Order to Make a <br />Reservation</h2>
        </div>
        <div class="form-inner">
            <form action="index.php" method="post">
                <div class="row clearfix">
                    <div class="col-lg-6 col-md-6 col-sm-12 form-group">
                        <input type="text" name="name" placeholder="Full name" required="">
                    </div>
                    <div class="col-lg-6 col-md-6 col-sm-12 form-group">
                        <input type="email" name="email" placeholder="Email address" required="">
                    </div>
                    <div class="col-lg-6 col-md-6 col-sm-12 form-group">
                        <input type="text" name="phone" placeholder="Phone number" required="">
                    </div>
                    <div class="col-lg-6 col-md-6 col-sm-12 form-group">
                        <div class="select-box">
                            <select class="wide">
                                <option data-display="Occasion">Occasion</option>
                                <option value="1">Occasion 01</option>
                                <option value="2">Occasion 02</option>
                                <option value="3">Occasion 03</option>
                                <option value="3">Occasion 04</option>
                            </select>
                        </div>
                    </div>
                    <div class="col-lg-6 col-md-6 col-sm-12 form-group">
                        <div class="select-box">
                            <select class="wide">
                                <option data-display="Preferred food">Preferred food</option>
                                <option value="1">Preferred food 01</option>
                                <option value="2">Preferred food 02</option>
                                <option value="3">Preferred food 03</option>
                                <option value="3">Preferred food 04</option>
                            </select>
                        </div>
                    </div>
                    <div class="col-lg-6 col-md-6 col-sm-12 form-group">
                        <div class="select-box">
                            <select class="wide">
                                <option data-display="Number of persons">Number of persons</option>
                                <option value="1">Number of persons 01</option>
                                <option value="2">Number of persons 02</option>
                                <option value="3">Number of persons 03</option>
                                <option value="3">Number of persons 04</option>
                            </select>
                        </div>
                    </div>
                    <div class="col-lg-6 col-md-6 col-sm-12 form-group">
                        <div class="select-box">
                            <select class="wide">
                                <option data-display="Booking type">Booking type</option>
                                <option value="1">Booking type 01</option>
                                <option value="2">Booking type 02</option>
                                <option value="3">Booking type 03</option>
                                <option value="3">Booking type 04</option>
                            </select>
                        </div>
                    </div>
                    <div class="col-lg-6 col-md-6 col-sm-12 form-group">
                        <div class="icon"><i class="icon-13"></i></div>
                        <input type="text" name="date" placeholder="Booking date" id="datepicker">
                    </div>
                    <div class="col-lg-12 col-md-12 col-sm-12 form-group">
                        <textarea name="message" placeholder="Special request"></textarea>
                    </div>
                    <div class="col-lg-12 col-md-12 col-sm-12 form-group message-btn centred">
                        <button type="submit" class="theme-btn-one">Make a Reservation</button>
                    </div>
                </div>
            </form>
        </div>
    </div>
</section>
<!-- order-section end -->


<?php require_once('parts/footer/footer.php'); ?>
<?php require_once('parts/layout/bottom-layout.php'); ?>