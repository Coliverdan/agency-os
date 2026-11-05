        <!-- main header -->
        <header class="main-header header-style-four">
            <!-- header-top -->
            <div class="header-top">
                <div class="auto-container">
                    <div class="top-inner">
                        <p><i class="icon-1"></i>Open Hours: Mon - Fri 8.00 am - 6.00 pm</p>
                        <ul class="social-links">
                            <li><span>On Social:</span></li>
                            <li><a href="index.php"><i class="fab fa-facebook-f"></i></a></li>
                            <li><a href="index.php"><i class="fab fa-twitter"></i></a></li>
                            <li><a href="index.php"><i class="fab fa-linkedin-in"></i></a></li>
                        </ul>
                    </div>
                </div>
            </div>
            <!-- header-lower -->
            <div class="header-lower">
                <div class="auto-container">
                    <div class="outer-box">
                        <div class="logo-box">
                            <figure class="logo"><a href="index.php"><img src="assets/images/logo-3.png" alt=""></a></figure>
                        </div>
                        <div class="menu-area">
                            <!--Mobile Navigation Toggler-->
                            <div class="mobile-nav-toggler">
                                <i class="icon-bar"></i>
                                <i class="icon-bar"></i>
                                <i class="icon-bar"></i>
                            </div>
                            <nav class="main-menu navbar-expand-md navbar-light clearfix">
                                <div class="collapse navbar-collapse show clearfix" id="navbarSupportedContent">
                                    <?php require_once('parts/header/menu.php'); ?>
                                </div>
                            </nav>
                        </div>
                        <div class="menu-right-content">
                            <div class="search-box-outer search-toggler mr_25">
                                <i class="icon-2"></i>
                            </div>
                            <div class="language-picker js-language-picker mr_25" data-trigger-class="btn btn--subtle">
                                <form action="index-2.php" class="language-picker__form">
                                    <label for="language-picker-select">Select your language</label>
                                    <select name="language-picker-select" id="language-picker-select">
                                        <option lang="de" value="deutsch"></option>
                                        <option lang="en" value="english" selected></option>
                                        <option lang="fr" value="francais"></option>
                                        <option lang="it" value="italiano"></option>
                                    </select>
                                </form>
                            </div>
                            <div class="btn-box"><a href="index.php">Account</a></div>
                        </div>
                    </div>
                </div>
            </div>

            <!--sticky Header-->
            <div class="sticky-header">
                <div class="auto-container">
                    <div class="outer-box">
                        <div class="logo-box">
                            <figure class="logo"><a href="index.php"><img src="assets/images/logo.png" alt=""></a></figure>
                        </div>
                        <div class="menu-area">
                            <nav class="main-menu clearfix">
                                <!--Keep This Empty / Menu will come through Javascript-->
                            </nav>
                        </div>
                        <div class="menu-right-content">
                            <div class="search-box-outer search-toggler mr_25">
                                <i class="icon-2"></i>
                            </div>
                            <div class="language-picker js-language-picker mr_25" data-trigger-class="btn btn--subtle">
                                <form action="index-2.php" class="language-picker__form">
                                    <label for="language-picker-select">Select your language</label>
                                    <select name="language-picker-select" id="language-picker-select">
                                        <option lang="de" value="deutsch"></option>
                                        <option lang="en" value="english" selected></option>
                                        <option lang="fr" value="francais"></option>
                                        <option lang="it" value="italiano"></option>
                                    </select>
                                </form>
                            </div>
                            <div class="btn-box"><a href="index.php">Account</a></div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
        <!-- main-header end -->