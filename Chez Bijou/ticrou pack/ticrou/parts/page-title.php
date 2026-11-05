        <!-- Page Title -->
        <section class="page-title centred">
            <div class="bg-layer" style="background-image: url(assets/images/background/page-title.jpg);"></div>
            <div class="auto-container">
                <div class="content-box">
                    <h2><?php if (isset($page_title) && !empty($page_title)) {
                            echo $page_title;
                        } ?></h2>
                    <ul class="bread-crumb clearfix">
                        <li><a href="index.php">Home</a></li>
                        <li><?php if (isset($page_title) && !empty($page_title)) {
                                echo $page_title;
                            } ?></li>
                    </ul>
                </div>
            </div>
        </section>
        <!-- End Page Title -->