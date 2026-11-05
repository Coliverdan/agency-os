<?php $head_title = "FAQ || Ticrou || Ticrou PHP Template" ?>
<?php require_once('parts/layout/top-layout.php'); ?>
<?php require_once('parts/header/header.php'); ?>


<?php
$page_title = "FAQ";
require_once('parts/page-title.php');
?>





<!-- faq-section -->
<section class="faq-section">
    <figure class="vector-1"><img src="assets/images/icons/vector-2.png" alt=""></figure>
    <figure class="vector-2"><img src="assets/images/icons/vector-4.png" alt=""></figure>
    <div class="auto-container">
        <div class="sec-title centred mb_60">
            <span class="sub-title">Ask Your Question</span>
            <h2>Frequently Asked Question</h2>
        </div>
        <div class="accordion-inner">
            <ul class="accordion-box">
                <li class="accordion block active-block">
                    <div class="acc-btn active">
                        <div class="icon-outer"></div>
                        <h5><span>q</span>Is Gordon available to attend or speak at our event?</h5>
                    </div>
                    <div class="acc-content current">
                        <div class="text">
                            <p>Sodales posuere facilisi metus elementum ipsum egestas amet amet mattis commodo Nunc tempor amet massa diam mauris. Risus sodales interdum magna felis adipiscing consectetur sed consectetur.</p>
                        </div>
                    </div>
                </li>
                <li class="accordion block">
                    <div class="acc-btn">
                        <div class="icon-outer"></div>
                        <h5><span>q</span>Could Gordon please record a special message for us?</h5>
                    </div>
                    <div class="acc-content">
                        <div class="text">
                            <p>Sodales posuere facilisi metus elementum ipsum egestas amet amet mattis commodo Nunc tempor amet massa diam mauris. Risus sodales interdum magna felis adipiscing consectetur sed consectetur.</p>
                        </div>
                    </div>
                </li>
                <li class="accordion block">
                    <div class="acc-btn">
                        <div class="icon-outer"></div>
                        <h5><span>q</span>We are visiting one of the restaurants. Is Gordon available to say hello?</h5>
                    </div>
                    <div class="acc-content">
                        <div class="text">
                            <p>Sodales posuere facilisi metus elementum ipsum egestas amet amet mattis commodo Nunc tempor amet massa diam mauris. Risus sodales interdum magna felis adipiscing consectetur sed consectetur.</p>
                        </div>
                    </div>
                </li>
                <li class="accordion block">
                    <div class="acc-btn">
                        <div class="icon-outer"></div>
                        <h5><span>q</span>Please can you send me a signed autograph from Gordon?</h5>
                    </div>
                    <div class="acc-content">
                        <div class="text">
                            <p>Sodales posuere facilisi metus elementum ipsum egestas amet amet mattis commodo Nunc tempor amet massa diam mauris. Risus sodales interdum magna felis adipiscing consectetur sed consectetur.</p>
                        </div>
                    </div>
                </li>
                <li class="accordion block">
                    <div class="acc-btn">
                        <div class="icon-outer"></div>
                        <h5><span>q</span>Would Gordon like to become a patron of our charity?</h5>
                    </div>
                    <div class="acc-content">
                        <div class="text">
                            <p>Sodales posuere facilisi metus elementum ipsum egestas amet amet mattis commodo Nunc tempor amet massa diam mauris. Risus sodales interdum magna felis adipiscing consectetur sed consectetur.</p>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</section>
<!-- faq-section end -->


<!-- faq-form-section -->
<section class="faq-form-section centred">
    <figure class="vector-1"><img src="assets/images/icons/vector-6.png" alt=""></figure>
    <div class="shape" style="background-image: url(assets/images/shape/shape-2.png);"></div>
    <div class="bg-layer" style="background-image: url(assets/images/background/form-bg.jpg);"></div>
    <div class="auto-container">
        <div class="inner-box">
            <h2>Do You Have Any <br />Questions?</h2>
            <div class="form-inner">
                <form action="team-details.php" method="post">
                    <div class="row clearfix">
                        <div class="col-lg-6 col-md-6 col-sm-12 form-group">
                            <input type="text" name="name" placeholder="Your name" required="">
                        </div>
                        <div class="col-lg-6 col-md-6 col-sm-12 form-group">
                            <input type="email" name="email" placeholder="Your email" required="">
                        </div>
                        <div class="col-lg-12 col-md-12 col-sm-12 form-group">
                            <input type="text" name="phone" placeholder="Phone number" required="">
                        </div>
                        <div class="col-lg-12 col-md-12 col-sm-12 form-group">
                            <textarea name="message" placeholder="Type message"></textarea>
                        </div>
                        <div class="col-lg-12 col-md-12 col-sm-12 form-group message-btn">
                            <button type="submit" class="theme-btn-one">Submit Now</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</section>
<!-- faq-form-section end -->


<?php require_once('parts/footer/footer.php'); ?>
<?php require_once('parts/layout/bottom-layout.php'); ?>