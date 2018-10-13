<template>
<!-- Ashwith Gundu - Created Admin Show Card -->
<!-- Saivarun Illendula - Added Modal for Add Show -->
    <div class="col-md-12 col-sm-12 my-3">
      <div class="card rounded mb-3" >
        <div class="card-header grey text-white">
          <div class="d-inline-block font-weight-bold float-left">
              <h1>{{ show.ShowTitle }}</h1>
          </div>
        </div>
        <div class="card-body green">
          <div class="content">
            <div class="row justify-content-around m-3 rounded  bg-light">
              <!-- image column -->
              <div class="col-lg align-self-center" id="imagediv">
                <img :src="'http://localhost:3000/user/image?_id=' + show._id + '&token=' + token + '&time=' + time" class="rounded mx-1 my-1 w-100" alt="Image" id="imagesrc" />
                <!-- <img class="rounded mx-1 my-1 w-100" alt="Image" id="imagesrc" /> -->
              </div>
              <!-- image column end -->
              <!-- details of the show -->
              <div class="col-lg lead text-left font" style="border:1px  ">
                <!-- Date -->
                <span class="font-weight-bold">Date :
                  <span class="font-weight-normal">{{ show.ShowDate }}</span>
                </span>
                <br>
                <!-- Time  -->
                <span class="font-weight-bold">Time :
                  <span class="font-weight-normal">{{ ShowTime }}</span>
                </span>
                <br>
                <!-- Venue -->
                <span class="font-weight-bold">Venue :
                  <span class="font-weight-normal">{{ show.ShowVenue }}</span>
                </span>
                <br>
                <!-- Rating -->
                <span class="font-weight-bold">Rating :
                  <span class="font-weight-normal">{{ show.ShowRating}}</span>
                </span>
                <br>
                <!-- Description -->
                <span>
                  <button type="button" class="btn btn-light font-weight-bold" @click="emitshowdescription(show)">
                    Description
                  </button>
                </span>
                <br>
              </div>
              <!-- details of the show END -->
              <div class="col-lg lead" style="border:1px ">
                <div class="component pb-1 mt-1 text-left seats_rounded bg-success text-light " style="border:2px solid grey">
                  <!-- Total Seats -->
                  <span class="px-3 font-weight-bold">
                      Limited Seats Available
                  </span>
                  <br>

                </div>
                  <!-- Adult Ticket -->
                <h1 class="mt-2 text-danger text-center lead" v-for="ele in show.Ticketdetails" :key="ele.TicketType" >
                    <span class="font-weight-bold display"> $ {{ ele.TicketPrice }} </span>
                    <span class="font-weight-normal">For {{ ele.TicketType }}</span>
                </h1>
              </div>
            </div>
          <!-- end buttons inside card -->
          </div>
          <!-- card-content-body -->
        </div>
      <!-- card-body -->
      </div>
    <!-- card -->
  </div>
</template>

<script>
export default {
  name: 'UserShow',
  data () {
    return {
      /* global moment */
      ShowDate: moment(this.show.ShowDate, 'YYYY-MM-DD').format('MMMM Do YYYY'),
      ShowTime: moment(this.show.ShowTime, 'HH:mm').format('hh:mm a'),
      token: window.localStorage.getItem('AccessToken'),
      showImg: true,
      time: Date()
    }
  },
  props: ['show'],
  methods: {
    emitshowdescription (showclicked) {
      this.$eventbus.$emit('showdescription', showclicked)
    }
  },
  watch: {
    show: function (newVal, oldVal) {
      this.ShowDate = moment(newVal.ShowDate, 'YYYY-MM-DD').format('MMMM Do YYYY')
      this.ShowTime = moment(newVal.ShowTime, 'HH:mm').format('hh:mm a')
    }
  }
}
</script>

<style scoped>
  #delete:hover {
    color: #910000;
    background-color: #DA7A7A
  }
  #delete {
    color: #D14F4F;
    background-color: none
  }
  .btn-default.btn-on.active {
      background-color: #5BB75B;
      color: white;
  }

  .btn-default.btn-off.active {
      background-color: #DA4F49;
      color: white;
  }

  .btn-default.btn-on-1.active {
      background-color: #006FFC;
      color: white;
  }

  .btn-default.btn-off-1.active {
      background-color: #DA4F49;
      color: white;
  }

  .btn-default.btn-on-2.active {
      background-color: #00D590;
      color: white;
  }

  .btn-default.btn-off-2.active {
      background-color: #A7A7A7;
      color: white;
  }

  .btn-default.btn-on-3.active {
      color: #5BB75B;
      font-weight: bolder;
  }

  .btn-default.btn-off-3.active {
      color: #DA4F49;
      font-weight: bolder;
  }

  .btn-default.btn-on-4.active {
      background-color: #006FFC;
      color: #5BB75B;
  }

  .btn-default.btn-off-4.active {
      background-color: #DA4F49;
      color: #DA4F49;
  }

  .green {
      background-color: rgb(0, 92, 50);
  }
  .grey {
      background-color: #A9A9A9;
  }
  .seats_rounded {
      border-radius: 30px;
  }
  .font1{
    font-size:8vw;
  }
.card {
    box-shadow: 5px 4px 8px 0 rgba(20, 53, 40,0.2);
    transition: 0.3s;
}

.card:hover {
    box-shadow: 10px 10px 35px 0 #006600;
}

.slider.round {
  border-radius: 34px;
}

.slider.round:before {
  border-radius: 50%;
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

</style>
