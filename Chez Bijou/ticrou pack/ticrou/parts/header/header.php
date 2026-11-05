<!-- main header -->
<header class="main-header">
    <!-- header-top -->
    <div class="header-top">
        <div class="auto-container">
            <div class="top-inner">
                <div class="left-column">
                    <ul class="info clearfix">
                        <li><i class="icon-1"></i><a href="mailto:info@example.com">info@example.com</a></li>
                        <li><i class="icon-2"></i>Open Hours: Mon - Fri 8.00 am - 6.00 pm</li>
                    </ul>
                    <ul class="social-links clearfix">
                        <li><a href="index.php"><i class="fab fa-facebook-f"></i></a></li>
                        <li><a href="index.php"><i class="fab fa-twitter"></i></a></li>
                        <li><a href="index.php"><i class="fab fa-instagram"></i></a></li>
                    </ul>
                </div>
                <div class="right-column">
                    <div class="btn-box">
                        <a href="index.php">Book An Table</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- header-lower -->
    <div class="header-lower">
        <div class="auto-container">
            <div class="outer-box">
                <div class="logo-box">
                    <figure class="logo"><a href="index.php"><img src="assets/images/logo.png" alt=""></a></figure>
                </div>
                <div class="menu-area clearfix">
                    <!--Mobile Navigation Toggler-->
                    <div class="mobile-nav-toggler">
                        <i class="icon-bar"></i>
                        <i class="icon-bar"></i>
                        <i class="icon-bar"></i>
                    </div>
                    <nav class="main-menu navbar-expand-md navbar-light">
                        <div class="collapse navbar-collapse show clearfix" id="navbarSupportedContent">
                            <?php require_once('parts/header/menu.php'); ?>
                        </div>
                    </nav>
                </div>
                <ul class="nav-right">
                    <li class="search-box-outer search-toggler">
                        <i class="icon-3"></i>
                    </li>
                    <li class="shop-cart">
                        <a href="shop.php"><i class="icon-4"></i><span>3</span></a>
                    </li>
                </ul>
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
                <div class="menu-area clearfix">
                    <nav class="main-menu clearfix">
                        <!--Keep This Empty / Menu will come through Javascript-->
                    </nav>
                </div>
                <ul class="nav-right">
                    <li class="search-box-outer search-toggler">
                        <i class="icon-3"></i>
                    </li>
                    <li class="shop-cart">
                        <a href="shop.php"><i class="icon-4"></i><span>3</span></a>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</header>
<!-- main-header end -->