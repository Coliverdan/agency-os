<?php $head_title = "Contact Us || Ticrou || Ticrou PHP Template" ?>
<?php require_once('parts/layout/top-layout.php'); ?>
<?php require_once('parts/header/header.php'); ?>


<?php
$page_title = "Contact Us";
require_once('parts/page-title.php');
?>





<!-- contact-section -->
<section class="contact-section">
    <figure class="vector-1"><img src="assets/images/icons/vector-2.png" alt=""></figure>
    <figure class="vector-2"><img src="assets/images/icons/vector-4.png" alt=""></figure>
    <figure class="vector-3"><img src="assets/images/icons/vector-6.png" alt=""></figure>
    <div class="auto-container">
        <div class="row clearfix">
            <div class="col-lg-4 col-md-12 col-sm-12 info-column">
                <div class="info-inner">
                    <div class="text">
                        <h2>Ticrou Info</h2>
                        <p>Mauris magna sit elementum facilis lacusacphar.</p>
                    </div>
                    <ul class="info-list clearfix">
                        <li>
                            <i class="icon-39"></i>
                            <h5>Restaurant</h5>
                            <p>New Hyde Park, NY 11040</p>
                        </li>
                        <li>
                            <i class="icon-40"></i>
                            <h5>Phone No:</h5>
                            <p><a href="tel:913336660021">(+91) 333 666 0021</a></p>
                        </li>
                        <li>
                            <i class="icon-1"></i>
                            <h5>Email:</h5>
                            <p><a href="mailto:example@info.com">example@info.com</a></p>
                        </li>
                        <li>
                            <i class="icon-2"></i>
                            <h5>Opening Hours:</h5>
                            <p>Mon - Fri: 8:00AM - 6:00PM</p>
                        </li>
                    </ul>
                    <ul class="social-links clearfix">
                        <li><a href="contact.php"><i class="fab fa-facebook-f"></i></a></li>
                        <li><a href="contact.php"><i class="fab fa-twitter"></i></a></li>
                        <li><a href="contact.php"><i class="fab fa-pinterest-p"></i></a></li>
                        <li><a href="contact.php"><i class="fab fa-instagram"></i></a></li>
                    </ul>
                </div>
            </div>
            <div class="col-lg-8 col-md-12 col-sm-12 form-column">
                <div class="form-inner centred">
                    <h2>Get In Touch with <br />Ticrou</h2>
                    <form method="post" action="sendemail.php" id="contact-form">
                        <div class="row clearfix">
                            <div class="col-lg-6 col-md-6 col-sm-12 form-group">
                                <input type="text" name="username" placeholder="Your Name" required="">
                            </div>
                            <div class="col-lg-6 col-md-6 col-sm-12 form-group">
                                <input type="email" name="email" placeholder="Your email" required="">
                            </div>
                            <div class="col-lg-12 col-md-12 col-sm-12 form-group">
                                <input type="text" name="phone" required="" placeholder="Phone">
                            </div>
                            <div class="col-lg-12 col-md-12 col-sm-12 form-group">
                                <textarea name="message" placeholder="Message"></textarea>
                            </div>
                            <div class="col-lg-12 col-md-12 col-sm-12 form-group message-btn mr-0">
                                <button class="theme-btn-one" type="submit" name="submit-form">Submit Now</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</section>
<!-- contact-section end -->


<!-- google-map-section -->
<section class="google-map-section">
    <div class="map-inner p_relative d_block">
        <div
            class="google-map"
            id="contact-google-map"
            data-map-lat="40.712776"
            data-map-lng="-74.005974"
            data-icon-path="assets/images/icons/map-marker.png"
            data-map-title="Brooklyn, New York, United Kingdom"
            data-map-zoom="12"
            data-markers='{
                        "marker-1": [40.712776, -74.005974, "<h4>Branch Office</h4><p>77/99 New York</p>","assets/images/icons/map-marker.png"]
                    }'>

        </div>
    </div>
</section>
<!-- google-map-section end -->


<?php require_once('parts/footer/footer.php'); ?>
<?php require_once('parts/layout/bottom-layout.php'); ?>