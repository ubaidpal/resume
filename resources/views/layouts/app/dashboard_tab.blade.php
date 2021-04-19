<li class="has-sub @yield('dashboard')">
    <a href="javascript:;">
        <b class="caret pull-right"></b>
        <i class="fa fa-2x fa-desktop"></i>
        <span>Dashboard</span>
    </a>
    <ul class="sub-menu">
        <li class="@yield('logger_dashboard') has-sub">
            <a href="javascript:;">
                <b class="caret pull-right"></b> Statistics From Logger</a>


        </li>

        <li class="@yield('f5_dashboard')"><a href="">Statistics From Splunk (F5)</a></li>

    </ul>
</li>
