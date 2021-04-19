<script type="text/javascript">
    $(function() {
        $('#fancy-input').bind('blur', function(ev) {
            // pull in the new value
            var searchTerm = $(this).val();

            // remove any old highlighted terms
            $('body').removeHighlight();

            // disable highlighting if empty
            if ( searchTerm ) {
                // highlight the new term
                $('body').highlight( searchTerm );
            }
        });
    });
    </script>
<style>
.highlight {
    background-color: #fff34d;
    -moz-border-radius: 5px; /* FF1+ */
    -webkit-border-radius: 5px; /* Saf3-4 */
    border-radius: 5px; /* Opera 10.5, IE 9, Saf5, Chrome */
    -moz-box-shadow: 0 1px 4px rgba(0, 0, 0, 0.7); /* FF3.5+ */
    -webkit-box-shadow: 0 1px 4px rgba(0, 0, 0, 0.7); /* Saf3.0+, Chrome */
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.7); /* Opera 10.5+, IE 9.0 */
}

    </style>



<!-- begin #page-loader -->
<div id="page-loader" class="fade in"><span class="spinner"></span></div>
<!-- end #page-loader -->

<!-- begin #page-container -->
<div id="page-container" class="page-container fade page-sidebar-fixed page-header-fixed content-full-width content-inverse-mode">
<!-- begin #header -->
<div id="header" class="header navbar navbar-default navbar-fixed-top">
   <!-- begin container-fluid -->
   <div class="container-fluid">
       <!-- begin mobile sidebar expand / collapse button -->

       <div class="navbar-header">
           <span class="navbar-brand" style="width:520px">
           <a href=""><img class="icyber-logo img-thumbnail"  src="{!! getUserAvatar() !!}" >Welcome to {{ucfirst(@$name)}}</a>

             </span>
              <button type="button" class="navbar-toggle" data-click="sidebar-toggled">
               <span class="icon-bar"></span>
               <span class="icon-bar"></span>
               <span class="icon-bar"></span>
           </button>
       </div>
       <!-- end mobile sidebar expand / collapse button -->


       <!-- begin header navigation right -->
       <ul class="nav navbar-nav navbar-right">

           @if (Auth::guest())
           <li><a href="{{ route('login') }}">Login</a></li>
           <li><a href="{{ route('register') }}">Register</a></li>

           @else
           <li>
               <form class="navbar-form full-width">
                   <div class="form-group">
                       <input type="text" id="fancy-input" class="form-control" placeholder="Enter keyword" />
                       <button id="search" type="button" class="btn btn-search"><i class="fa fa-search"></i></button>
                   </div>
               </form>

           </li>

           <li class="dropdown">

               <ul class="dropdown-menu media-list pull-right animated fadeInDown">

                 {{--  <li class="dropdown-footer text-center">
                       <a href="{{url($name.'/recent-visits')}}">View more</a>
                   </li>--}}
               </ul>
           </li>
           <li class="dropdown navbar-user">

               <a href="{{url('home')}}" class="dropdown-toggle" data-toggle="dropdown">
                   <img  class="img-responsive img-rounded"  src="{!! getUserAvatar() !!}" alt="User Avatar" />
                   <span class="hidden-xs">{{\Auth::user()->name}}</span> <b class="caret"></b>
               </a>

               <ul class="dropdown-menu animated fadeInLeft">
                   <li>
                     <a  href="{{ route('logout') }}"
                     onclick="event.preventDefault();
                     document.getElementById('logout-form').submit();sessionStorage.clear();">
                     Logout
                 </a>
                 <form id="logout-form" action="{{ route('logout') }}" method="POST" style="display: none;">
                   {{ csrf_field() }}
               </form>
               </ul>
           </li>

       </ul>
   </li>
       @endif
</ul>

</div>

</div>


@yield('content')
@yield('content1')
@yield('content2')
@yield('content3')

</div>

