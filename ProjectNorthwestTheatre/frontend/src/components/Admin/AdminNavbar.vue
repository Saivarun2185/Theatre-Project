<template>
<!-- Ashwith Gundu - Created side navigation bar -->
<div class="container-fluid" style=" ">
    <div class="sticky-top" >
        <nav class="navbar bg-dark bor text-light sticky-top" style="overflow-x:hidden;" >
            <a href="" data-target="#sidebar" data-toggle="collapse" class="d-md-none" id="show_content">
                <i class="fa fa-bars"></i>
            </a>
            <router-link class="navbar-brand tex " to="/admin/dashboard"><h1>Theatre Northwest</h1></router-link>
            <button class="btn white_green px-4" @click="logout()" v-if="login"><span class="mr-2"><i class="fas fa-sign-out-alt"></i></span>Logout</button>
        </nav>
    </div>
    <div id="adminnavbar" class="row">
        <div class="col-sm-2 collapse d-sm-flex position-fixed" id="sidebar">
            <div class="col-sm-10 bg-dark pt-2" v-if="login">
                <ul class="nav flex-column flex-nowrap ">
                  <li class="nav-item my-2">
                      <router-link to="/admin/dashboard" class="btn white_green btn-block">
                        <span class="mr-2"><i class="fas fa-home"></i></span>Home</router-link>
                  </li>
                  <li class="nav-item my-2">
                      <button class="btn white_green btn-block" @click="addshowevent()">
                        <span class="mr-2"><i class="fas fa-plus-circle"></i> </span>
                        Add Show </button>
                  </li>
                  <li class="nav-item my-2">
                      <router-link to="/admin/adminlist" class="btn white_green btn-block">
                        <span class="mr-2"><i class="fas fa-list-ul"></i></span>Admin List</router-link>
                  </li>
                  <li class="nav-item my-2">
                      <router-link to="/admin/addadmin" class="btn white_green  btn-block">
                        <span class="mr-2"><i class="fas fa-user"></i></span>Add Admin</router-link>
                  </li>
                  <li class="nav-item my-2">
                      <router-link to="/admin/sectionlist" class="btn white_green btn-block">
                      <span class="mr-2"><i class="fas fa-th-list"></i></span>View Section</router-link>
                  </li>
                  <li class="nav-item my-2">
                      <router-link to="/admin/addsection" class="btn white_green btn-block">
                      <span class="mr-2"><i class="fas fa-plus"></i></span>Add Section</router-link>
                  </li>
                  <li class="nav-item my-2">
                    <router-link to="/admin/cancelticket" class="btn white_green btn-block">
                    <span class="mr-2"><i class="fas fa-ban"></i> CancelTicket</span></router-link>
                </li>
                </ul>
            </div>
        </div>
        <div class="col-sm-10 offset-sm-2" id="rem_content">
            <slot class="col-sm-12"></slot>
        </div>
    </div>
    <div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModal" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <!-- Modal Header -->
          <div class="modal-header">
            <h4 class="modal-title">Add New Show Details:</h4>
            <button type="button" class="close" data-dismiss="modal">&times;</button>
          </div>
          <!-- Modal body -->
          <div class="modal-body">
            <form @submit.prevent="addshow" id="addshow">
              <div class="form-group row">
                <label class="col-sm-4 form-label required">Show Name:</label>
                <input class="col-sm-7 form-control" type="text" placeholder="Show Name" id="showname" name="ShowTitle" required>
              </div>
              <div class="form-group row">
                <label class="col-sm-4 form-label required">Playwright:</label>
                <input class="col-sm-7 form-control" type="text" placeholder="Playwright" id="playwright" name="ShowPlayWright" required>
              </div>
              <div class="form-group row">
                <label class="col-sm-4 form-label">Description:</label>
                <textarea class="col-sm-7 form-control" type="text" placeholder="Description of Show" id="description" name="ShowDescription">
                </textarea>
              </div>
              <div class="form-group row">
                <label class="col-sm-4 form-label">Show Date:</label>
                    <input type="text" class="date form-control col-sm-7" name="ShowDate" id="datepicker-input" required>
                        <span @click="showdatepicker()" id="date-icon" class="col-sm-1">
                          <i class="fas fa-calendar-alt fa-2x" aria-hidden="true" ></i>
                        </span>
                <!-- <input class="col-sm-7 form-control" type="date" id="showdate" name="ShowDate" required> -->
              </div>
              <div class="form-group row">
                <label class="col-sm-4 form-label required">Show Time:</label>
                 <input class="col-sm-7 form-control" type="time" name="ShowTime" id="showtime" required>
              </div>
                <div class="form-group row">
                  <label class="col-sm-4 form-label required">Total Seats:</label>
                  <input class="col-sm-7 form-control" type="number" placeholder="Total No. of Tickets" id="totalseats" name="NumberOfTickets" min="1" required>
                </div>
                <div class="form-group row">
                  <label class="col-sm-4 form-label required">Venue:</label>
                  <input class="col-sm-7 form-control" type="text" placeholder="Venue" id="showvenue" name="ShowVenue" required>
                </div>
                <div class="form-group row">
                  <label class="col-sm-4 form-label">Show Rating:</label>
                  <select id="inputState" class="form-control col-sm-7" required name="ShowRating" >
                    <option selected>Choose...</option>
                    <option>A</option>
                    <option>U/A</option>
                    <option>R</option>
                  </select>
                </div>

                <form @submit.prevent="addticketprice()" id="ticketform">
                  <div class="form-group row">
                    <label class="col-sm-4 form-label required">Ticket Type:</label>
                    <input class="col-sm-6 form-control" type="text" placeholder="Ticket Type"  id="TicketTypeAddShow" required>
                  </div>
                  <div class="form-group row">
                    <label class="col-sm-4 form-label required">Ticket Price:</label>
                      <div class="input-group-prepend">
                        <div class="input-group-text">$</div>
                      </div>
                    <input class="col-sm-4 form-control" type="number" placeholder="Ticket Price" id="TicketPriceAddShow" min="1" required>
                    <button class="btn col-sm-1.5 offset-sm-1" type="submit">Add</button>
                  </div>
                </form>

                <div class="form-group row">
                  <ol class="col-sm-8 offset-sm-2" name="ticketdetails" id="ticketdetails">
                    <li v-for="ticket in ticketdetails" :key="ticket.TicketType" style="height: 50px;vertical-align: middle">
                      {{ ticket.TicketType }} - $ {{ ticket.TicketPrice }}
                        <button type="button" class="btn rounded-circle float-right mx-2" id="delete" @click="deleteticket(ticket.TicketType)">
                            <i class="fas fa-trash"></i>
                        </button>
                    </li>
                  </ol>
                </div>
                <div class="form-group row">
                  <label class="col-sm-4 form-label required">Upload Image:</label>
                  <div class="form-group col-sm-7">
                    <input type="file" accept="image/*" class="form-control-file" id="InputFile" aria-describedby="fileHelp" name="ShowImage" required>
                    <small id="fileHelp" class="form-text text-muted"></small>
                  </div>
                </div>
                <div class="form-group row">
                  <label class="col-sm-4 form-label">Publish:</label>
                    <label class="switch float-right form-group">
                      <input type="checkbox" class="sliderinput" v-model="formdata.isPublished" name="isPublished" value="true">
                      <span class="slider round"></span>
                   </label>
                 </div>
                <div class="">
                    <button type="reset" class=" btn btn-danger">Reset</button>
                    <button type="submit" class=" btn btn-success">Add & Save</button>
                </div>
            </form>
          </div>
        </div>
      </div>
    </div>
</div>
</template>

<script>
export default {
  name: 'AdminNavbar',
  data () {
    return {
      pathname: '',
      formdata: {
        isPublished: false
      },
      /* global moment  */
      showtime: moment().format('HH:mm'),
      ticketdetails: [
      ]
    }
  },
  props: ['login'],
  methods: {
    showdatepicker () {
      console.log('date picker clicked')
      // $('.date').datepicker('show')
    },
    logout () {
      window.localStorage.clear()
      var _this = this
      _this.$router.push('/admin/login')
    },
    addshowevent () {
      console.log(this.$eventbus)
      this.$eventbus.$emit('addshow')
    },
    addshow () {
      var data = new FormData(document.querySelector('#addshow'))
      data.append('Ticketdetails', JSON.stringify(this.ticketdetails))
      /*
        ShowTitle: data.get('ShowTitle'),
        ShowPlayWright: data.get('ShowPlayWright'),
        ShowDescription: data.get('ShowDescription'),
        ShowDate: data.get('ShowDate'),
        ShowTime: data.get('ShowTime'),
        NumberOfTickets: data.get('NumberOfTickets'),
        ShowVenue: data.get('ShowVenue'),
        ShowRating: data.get('ShowRating'),
        ShowImage: data.get('ShowImage'),
        isPublished: data.get('isPublished'),
      */
      /* global $ axios url _ swal */
      axios.create({
        baseURL: url,
        headers: { 'token': window.localStorage.getItem('AccessToken') }
      }).post('/addshow',
        data
      )
        .then(res => {
          axios({
            method: 'get',
            headers: {
              token: window.localStorage.getItem('AccessToken')
            },
            url: url + '/showlist'
          })
            .then(response => {
              this.$eventbus.$emit('refreshdata', response.data)
              $('#myModal').modal('hide')
              $('#addshow')[0].reset()
            })
            .catch(err => {
              console.log('error while getting show list', err)
            })
        })
        .catch(error => {
          console.log(error)
        })
    },
    addticketprice () {
      // console.log(TicketType.value)
      this.ticketdetails.push({
        'TicketType': $('#TicketTypeAddShow').val(),
        'TicketPrice': $('#TicketPriceAddShow').val()
      })
      document.getElementById('ticketform').reset()
    },
    deleteticket (TicketType) {
      swal({
        title: `Do you want to delete ${TicketType} ?`,
        text: "You won't be able to revert this!",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: `Yes, delete!`
      })
        .then((result) => {
          if (result.value) {
            this.ticketdetails = _.without(this.ticketdetails, _.findWhere(this.ticketdetails, {
              TicketType: TicketType
            }))
            swal(
              'Deleted!',
              `Ticket Type:  ${TicketType} has been deleted.`,
              'success'
            )
          }
        })
    }
  },
  mounted () {
    console.log('mounted admin navbar')
    console.log('element ', document.getElementById('rem_content'))
    $('.date').datepicker({
      multidate: true,
      multidateSeparator: '; ',
      container: '#myModal'
    })
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

.nav{
    display: -webkit-box;
    display: flex;
    -ms-flex-wrap: wrap;
    flex-wrap: wrap;
    padding-left: 0px;
    margin-bottom: 0;
    list-style: none;
}
.container-fluid {
    padding-right:0;
    padding-left:0;
    margin-right:0;
    margin-left:0;
 }
 .switch {
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;
}

.switch .sliderinput {display:none;}

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

.sliderinput:checked + .slider {
  background-color: green;
}

.sliderinput:focus + .slider {
  box-shadow: 0 0 1px #2196F3;
}

.sliderinput:checked + .slider:before {
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

.white_green:hover {background-color: #aae8aa}

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
#delete:hover {
  color: #910000;
  background-color: #DA7A7A
}
#delete {
  color: #D14F4F;
  background-color: none
}
#date-icon{
  position: absolute;
  right: 45px;
  padding: 2px;
  display: flex;
  align-items: center;
}
#datepicker-input {
  padding-right: 40px;
  outline: none;
}
.row{
    display: -webkit-box;
    display: flex;
    -ms-flex-wrap: wrap;
    flex-wrap: wrap;
    margin-right: 0px;
    margin-left: 0px;
}
#sidebar{
  padding-left: 0px;
}
ul{
  padding-left: 10px;
}
</style>
