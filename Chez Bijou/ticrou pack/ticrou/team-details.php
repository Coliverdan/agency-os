<?php $head_title = "Team Details || Ticrou || Ticrou PHP Template" ?>
<?php require_once('parts/layout/top-layout.php'); ?>
<?php require_once('parts/header/header.php'); ?>


<?php
$page_title = "Team Details";
require_once('parts/page-title.php');
?>



<!-- team-details -->
<section class="team-details p_relative">
    <div class="auto-container">
        <div class="row clearfix">
            <div class="col-lg-5 col-md-12 col-sm-12 image-column">
                <div class="image-box mr_50">
                    <div class="shape" style="background-image: url(assets/images/shape/shape-2.png);"></div>
                    <figure class="image"><img src="assets/images/team/team-9.jpg" alt=""></figure>
                </div>
            </div>
            <div class="col-lg-7 col-md-12 col-sm-12 content-column">
                <div class="team-details-content">
                    <div class="team-info">
                        <h2>Robert Downey</h2>
                        <span class="designation">Master Chef</span>
                        <div class="text">
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Semper sagittis dolor aliquet quam feugiat nisi a ultrices feugiat. Viverra facilisi turpis eget tempor. Mattis risus amet euismod eleifend. Proin ut eget sagittis mi quis viverra.</p>
                            <p>Dictum tellus sollicitudin senectus. Eu nullam posuere aliquet bibendum id sed ipsum semper. Feugiat augue parturient id enim.</p>
                        </div>
                        <ul class="info-list clearfix">
                            <li><span>Expertise: </span>Strategy, Leadership</li>
                            <li><span>Experience: </span>20 Years</li>
                            <li><span>Email: </span><a href="mailto:robertdowney@gmail.com">robertdowney@gmail.com</a></li>
                            <li><span>Phone: </span><a href="tel:913336660021">(+91) 333 666 0021</a></li>
                        </ul>
                        <ul class="social-links clearfix">
                            <li><a href="team-details.php"><i class="fab fa-facebook-f"></i></a></li>
                            <li><a href="team-details.php"><i class="fab fa-twitter"></i></a></li>
                            <li><a href="team-details.php"><i class="fab fa-instagram"></i></a></li>
                        </ul>
                    </div>
                    <div class="skills-inner mb_70">
                        <div class="text mb_30">
                            <h3>My Skills</h3>
                            <p>Consectetur adipiscing elit. Semper sagittis dolor aliquet quam feugiat nisi a ultrices feugiat Viverra facilisi turpis eget tempor. Mattis risus amet euismod eleifend. Proin ut eget sagittis mi quis viverra.</p>
                        </div>
                        <div class="progress-box">
                            <div class="progress-box p_relative d_block mb_35">
                                <p>Management</p>
                                <div class="bar">
                                    <div class="bar-inner count-bar" data-percent="75%"></div>
                                    <div class="count-text">75%</div>
                                </div>
                            </div>
                            <div class="progress-box p_relative d_block mb_35">
                                <p>Public Speaking</p>
                                <div class="bar">
                                    <div class="bar-inner count-bar" data-percent="90%"></div>
                                    <div class="count-text">90%</div>
                                </div>
                            </div>
                            <div class="progress-box p_relative d_block mb_35">
                                <p>Problem Solving</p>
                                <div class="bar">
                                    <div class="bar-inner count-bar" data-percent="80%"></div>
                                    <div class="count-text">80%</div>
                                </div>
                            </div>
                            <div class="progress-box p_relative d_block">
                                <p>Strategy Planning</p>
                                <div class="bar">
                                    <div class="bar-inner count-bar" data-percent="70%"></div>
                                    <div class="count-text">70%</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="contact-inner">
                        <h3>Contact Me</h3>
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
            </div>
        </div>
    </div>
</section>
<!-- team-details end -->


<?php require_once('parts/footer/footer.php'); ?>
<?php require_once('parts/layout/bottom-layout.php'); ?>