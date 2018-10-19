<template>
    <!-- Ashwith Gundu - Created side navigation bar -->
    <div class="container-fluid" style=" ">
        <div class="sticky-top">
            <nav class="navbar bg-dark bor text-light sticky-top" style="overflow-x:hidden;">
                <a href="" data-target="#sidebar" data-toggle="collapse" class="d-md-none" id="show_content">
                    <i class="fa fa-bars"></i>
                </a>
                <router-link class="navbar-brand tex " to="/user/dashboard">
                    <h1>Theatre Northwest</h1>
                </router-link>
            </nav>
        </div>
        <div id="adminnavbar" class="row">
            <div class="col-sm-2 collapse d-sm-flex position-fixed" id="sidebar">
                <div class="col-sm-10 bg-dark pt-2">
                    <ul class="nav flex-column flex-nowrap ">
                        <li class="nav-item my-2">
                            <router-link to="/user/dashboard" class="btn white_green btn-block">
                                <span class="mr-2">
                              <i class="fas fa-home"></i>
                             </span>Home
                            </router-link>
                        </li>
                        <li class="nav-item my-2">
                            <router-link to="/user/cancelticket" class="btn white_green btn-block">
                                <span class="mr-2"><i class="fas fa-ban"></i>
                             </span>CancelTicket
                            </router-link>
                        </li>
                        <li class="nav-item my-2">
                            <router-link to="/user/directions" class="btn white_green btn-block">
                                <span class="mr-2"><i class="fas fa-directions"></i>
                             </span>Directions
                            </router-link>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="col-sm-10 offset-sm-2" id="rem_content">
                <slot class="col-sm-12"></slot>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: 'UserNavbar',
  data () {
    return {
      pathname: '',
      formdata: {
        isPublished: false
      },
      /* global moment  */
      showtime: moment().format('HH:mm')
    }
  },
  props: ['login'],
  methods: {},
  mounted () {
    console.log('mounted admin navbar')
    console.log('element ', document.getElementById('rem_content'))

    function myFunction1 () {
      console.log('myfunction1 show content')
      $('#sidebar').toggle()
    }

    function myFunction () {
      console.log('myfunction remainig content')
      $('#sidebar').hide()
    }
    if (document.getElementById('rem_content')) {
      document.getElementById('rem_content').addEventListener('click', myFunction)
    }
    if (document.getElementById('show_content')) {
      document.getElementById('show_content').addEventListener('click', myFunction1)
    }
    this.$eventbus.$on('addshow', function () {
      $('#myModal').modal('show')
    })
  }
}
/* global $ */
/* $(function () {
  function myFunction1 () {
    console.log('myfunction1 show content')
    $('#sidebar').toggle()
  }
  function myFunction () {
    console.log('myfunction remainig content')
    $('#sidebar').hide()
  }
  if (document.getElementById('rem_content')) {
    document.getElementById('rem_content').addEventListener('click', myFunction)
  }
  document.getElementById('show_content').addEventListener('click', myFunction1)
}) */
</script>

<style scoped>
#sidebar {
    min-height: 100%;
    z-index: 1;
}

.container-fluid {
    padding-right: 0;
    padding-left: 0;
    margin-right: auto;
    margin-left: auto
}

.switch {
    position: relative;
    display: inline-block;
    width: 60px;
    height: 34px;
}

.switch .sliderinput {
    display: none;
}

.slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #ccc;
    -webkit-transition: .4s;
    transition: .4s;
}

.slider:before {
    position: absolute;
    content: "";
    height: 26px;
    width: 26px;
    left: 4px;
    bottom: 4px;
    background-color: white;
    -webkit-transition: .4s;
    transition: .4s;
}

.sliderinput:checked+.slider {
    background-color: green;
}

.sliderinput:focus+.slider {
    box-shadow: 0 0 1px #2196F3;
}

.sliderinput:checked+.slider:before {
    -webkit-transform: translateX(26px);
    -ms-transform: translateX(26px);
    transform: translateX(26px);
}

/* Rounded sliders */

.slider.round {
    border-radius: 34px;
}

.slider.round:before {
    border-radius: 50%;
}

/* .white_green{
  color: #003300;
  background-color: white;
   font-weight: bold;
} */

.white_green {
    padding: 15px 5px;
    font-weight: bold;
    text-align: center;
    cursor: pointer;
    outline: none;
    color: #003300;
    background-color: #f5f5ef;
    border: none;
    box-shadow: 4px 4px 8px 0 #999;
}

.white_green:hover {
    background-color: #aae8aa
}

.white_green:active {
    background-color: #7fe682;
    box-shadow: 0 2px #666;
    transform: translateY(2px);
}

.bor {
    box-shadow: 4px 10px 2px -4px rgba(74, 243, 18, 0.172);
}

.tex {
    color: white;
    text-shadow: 1px 1px 2px black, 0 0 25px #7fe682, 0 0 5px rgba(74, 243, 18, 0.172);
}

.required:after {
    content: '*';
    color: red;
}
</style>
