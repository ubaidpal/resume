
<li class="nav-profile">
    <div class="image">
        <a href="{{url('home')}}">
            <img src="{!! getUserAvatar() !!}" alt="User Avatar" />
        </a>
    </div>
    <div class="info">

        <small>{{@$name}}</small>
    </div>
</li>

<!-- end sidebar user -->
<!-- begin sidebar nav -->

<li class="has-sub  @yield('profile_edit')">
    <a href="{{url('home')}}">
        <i class="fa fa-2x fa-edit"></i>
        <span>Profile Settings</span>
    </a>
</li>





<li class="@yield('users_Management') has-sub">
    <a href="javascript:void(0)">
        <b class="caret pull-right"></b>
        <i class="fa fa-users"></i>
        <span> User Management</span>
    </a>
    <ul class="sub-menu">
        <li class="@yield('recommendations')">
            <a href="{{url(@$name.'/recommendations')}}">
                <span>Recommendations</span>
            </a>

        </li>

        <li class="@yield('resume')">
            <a href="{{url(@$name.'/resume')}}">
                <span>Resume</span>
            </a>


        </li>

        <li class="@yield('multi_project')">
            <a href="{{url('multi-project-uploads')}}">
                <span>Projects</span>
            </a>

        </li>

        <li class="@yield('social_links')">
            <a href="{{url('social-links')}}">
                <span>Social</span>
            </a>

        </li>
        <li class="@yield('contact_us')">
            <a href="{{url('contact-detail')}}">
                <span>Contact US</span>
            </a>

        </li>


    </ul>
</li>



