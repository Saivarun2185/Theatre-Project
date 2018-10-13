<template>
<!-- Ashwith Gundu - Created Admin Show Card -->
<!-- Saivarun Illendula - Added Modal for Add Show -->
    <div class="col-md-12 col-sm-12 my-3">
      <div class="card rounded mb-3" >
        <div class="card-header grey text-white">
          <div class="d-inline-block font-weight-bold float-left">
              <h1>{{ show.ShowTitle }}</h1>
          </div>
          <div class="d-inline-block component float-right">
            <span class="mx-5" >
              <div class="btn-group rounded" id="status" data-toggle="buttons">
                <label class="btn btn-default btn-on" style="border:2px solid white" :class="{ active: show.isPublished }" @click="showstatuschanged(true)">
                  <input class="d-none" type="radio" value="1">
                  <strong>Publish</strong>
                </label>
                <label class="btn btn-default btn-off" style="border:2px solid white" :class="{ active: !show.isPublished }" @click="showstatuschanged(false)">
                  <input class="d-none" type="radio" value="0" >
                  <strong>UnPublish</strong>
                </label>
              </div>
            </span>
            <button type="button" class="btn rounded-circle float-right" id="delete" @click="deleteshow">
                <i class="fas fa-trash"></i>
            </button>
          </div>
        </div>
        <div class="card-body green">
          <div class="content">
            <div class="row justify-content-around m-3 rounded  bg-light">
              <!-- image column -->
              <div class="col-lg align-self-center" id="imagediv">
                <img :src="'http://localhost:3000/admin/image?_id=' + show._id + '&token=' + token + '&time=' + time" class="rounded mx-1 my-1 w-100" alt="Image" id="imagesrc" />
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
                  <!-- Seats Heading -->
                  <p class="font-weight-bold text-center rounded ">
                    SEATS
                  </p>
                  <!-- Total Seats -->
                  <span class="px-3  font-weight-bold">Total :
                    <span class="font-weight-normal">{{ show.NumberOfTickets }}</span>
                  </span>
                  <br>
                  <!-- Reserved Seats -->
                  <span class="px-3 font-weight-bold">Reserved :
                    <span class="font-weight-normal">{{ show.ReservedSeats }}</span>
                  </span>
                  <br>
                  <!-- Remaining Seats -->
                  <span class="px-3  font-weight-bold">Remaining :
                    <span class="font-weight-normal">{{ show.NumberOfTickets - show.ReservedSeats }}</span>
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
            <!-- buttons inside the card -->
            <div class="row justify-content-around m-2 bg-white rounded " style="border:1px ">
              <button class="col-sm m-2 btn btn-outline-primary" type="button"
              @click="emailevent()">
                <strong><span class = "mr-2"><i class="fas fa-envelope"></i></span>Email</strong>
              </button>
              <a class="col-sm m-2 btn btn-outline-warning" type="button" href="http://localhost:3000/Reports/SampleExcelReport.xlsx">
                <strong><span class = "mr-2"><i class="fas fa-file-excel"></i></span> Report</strong>
              </a>
              <button class="col-sm m-2 btn btn-outline-success" type="button" @click="emitevent()">
                <strong><span class = "mr-2"><i class="fas fa-ticket-alt"></i></span>Reserve Tickets</strong>
              </button>
              <button class="col-sm m-2 btn btn-outline-secondary" type="button"
              @click="editevent()">
                <strong><span class = "mr-2"><i class="far fa-edit"></i></span>Edit Show</strong>
              </button>
               <button class="col-sm m-2 btn btn-outline-secondary" type="button"
              @click="duplicateEvent(show)">
                <strong><span class = "mr-2"><i class="far fa-edit"></i></span>Duplicate Show</strong>
              </button>
            </div>
          <!-- end buttons inside card -->
          </div>
          <!-- card-content-body -->
        </div>
      <!-- card-body -->
      </div>
    <!-- card -->
    <!-- Modal -->
    <div class="modal fade" :id="'editshow'+show._id" tabindex="-1" role="dialog" :aria-labelledby="'editshow'+show._id" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <!-- Modal Header -->
          <div class="modal-header">
            <h4 class="modal-title">Edit Show Details:</h4>
            <button type="button" class="close" data-dismiss="modal">&times;</button>
          </div>
          <!-- Modal body -->
          <div class="modal-body">
            <form @submit.prevent="editshow" :id="'editshowform'+show._id">
              <div class="form-group row">
                <label class="col-sm-4 form-label">Show Name:</label>
                <input class="col-sm-7 form-control" type="text" placeholder="Show Name" id="showname" :value="show.ShowTitle" name="ShowTitle" required>
              </div>
              <div class="form-group row">
                <label class="col-sm-4 form-label">Playwright:</label>
                <input class="col-sm-7 form-control" type="text" placeholder="Playwright" id="playwright" :value="show.ShowPlayWright" name="ShowPlayWright" required>
              </div>
              <div class="form-group row">
                <label class="col-sm-4 form-label">Description:</label>
                <textarea class="col-sm-7 form-control" type="text" placeholder="Description of Show" id="description" :value="show.ShowDescription" name="ShowDescription" required>
                </textarea>
              </div>
              <div class="form-group row">
                <label class="col-sm-4 form-label">Show Date:</label>
                <input type="text" class="date form-control col-sm-7" name="ShowDate" id="datepicker-input"
                data-date-multidate="true" data-date-multidateSeparator="; " :data-date-container=" '#editshow' + show._id" 
                required>
                    <span @click="showdatepicker()" id="date-icon" class="col-sm-1">
                      <i class="fas fa-calendar-alt fa-2x" aria-hidden="true" ></i>
                    </span>
              </div>
              <div class="form-group row">
                <label class="col-sm-4 form-label">Show Time:</label>
                 <input class="col-sm-7 form-control" type="time" :value="show.ShowTime" id="showtime" name="ShowTime" required>
              </div>
                <div class="form-group row">
                  <label class="col-sm-4 form-label">Total Seats:</label>
                  <input class="col-sm-7 form-control" type="number" placeholder="Total No. of Tickets" id="totalseats" :value="show.NumberOfTickets" name="NumberOfTickets" min="1" required>
                </div>
                <div class="form-group row">
                  <label class="col-sm-4 form-label">Venue:</label>
                  <input class="col-sm-7 form-control" type="text" placeholder="Venue" id="showvenue" :value="show.ShowVenue" name="ShowVenue" required>
                </div>
                <div class="form-group row">
                  <label class="col-sm-4 form-label">Show Rating:</label>
                  <select id="inputState" class="form-control col-sm-7" required :value="show.ShowRating" name="ShowRating" >
                    <option selected>Choose...</option>
                    <option>A</option>
                    <option>U/A</option>
                    <option>R</option>
                  </select>
                </div>
               <form @submit.prevent="addticketpriceEditModal()" id="ticketformEdit">
                  <div class="form-group row">
                    <label class="col-sm-4 form-label required">Ticket Type:</label>
                    <input class="col-sm-6 form-control" type="text" placeholder="Ticket Type" id="TicketTypeEditShow" required>
                  </div>
                  <div class="form-group row">
                    <label class="col-sm-4 form-label required">Ticket Price:</label>
                      <div class="input-group-prepend">
                        <div class="input-group-text">$</div>
                      </div>
                    <input class="col-sm-4 form-control" type="number" placeholder="Ticket Price" id="TicketPriceEditShow" min="1" required>
                    <button class="btn col-sm-1.5 offset-sm-1" type="submit">Add</button>
                  </div>
                </form>

                <div class="form-group row">
                  <ol class="col-sm-8 offset-sm-2" name="ticketdetails" id="ticketdetails">
                    <li v-for="ticket in show.Ticketdetails" :key="ticket.TicketType" style="height: 50px;vertical-align: middle">
                      {{ ticket.TicketType }} - $ {{ ticket.TicketPrice }}
                        <button type="button" class="btn rounded-circle float-right mx-2" id="delete" @click="deleteticket(ticket.TicketType)">
                            <i class="fas fa-trash"></i>
                        </button>
                    </li>
                  </ol>
                </div>
                <div class="form-group row">
                  <label class="col-sm-4 form-label">Upload Image:</label>
                  <div class="form-group col-sm-7">
                    <input type="file" accept="image/*" class="form-control-file" id="InputFile" aria-describedby="fileHelp" :value="show.ShowImage" name="ShowImage" >
                    <small id="fileHelp" class="form-text text-muted"></small>
                  </div>
                </div>
                <div class="form-group row">
                  <label class="col-sm-4 form-label">Publish:</label>
                    <label class="switch float-right form-group">
                      <input type="checkbox" class="sliderinput" v-model="show.isPublished" name="isPublished" value="true">
                      <span class="slider round"></span>
                   </label>
                 </div>
                 <input type="hidden" :value="show._id" name="id">
                <div>
                    <button type="reset" class=" btn btn-danger">Reset</button>
                    <button type="submit" class=" btn btn-success">Save Changes</button>
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
  name: "AdminShow",
  data() {
    return {
      /* global moment */
      ShowDate: moment(this.show.ShowDate, "YYYY-MM-DD").format("MMMM Do YYYY"),
      ShowTime: moment(this.show.ShowTime, "HH:mm").format("hh:mm a"),
      token: window.localStorage.getItem("AccessToken"),
      showImg: true,
      time: Date()
    };
  },
  props: ["show"],
  methods: {
    emitevent() {
      console.log(this.show)
      this.$emit("showmodal", this.show);
    },
    emailevent() {
      this.$emit("showemailmodal", this.show);
    },
    editevent() {
      /* global $ */
      console.log("editclicked", this.show._id);
      $("#editshow" + this.show._id).modal("show");
      this.showdatepicker()
    },
    editshow() {
      console.log("editclicked");
      var formdata = new FormData(
        document.querySelector("#editshowform" + this.show._id)
      )
      formdata.append('Ticketdetails', JSON.stringify(this.show.Ticketdetails))

      // var _this = this
      axios
        .create({
          baseURL: url,
          headers: { token: window.localStorage.getItem("AccessToken") }
        })
        .post("/updateshow", formdata)
        .then(
          function(res) {
            $("#editshow" + this.show._id).modal("hide");
            swal("Updated!", "Show has been successfully updated.", "success");
            this.time = Date();
            axios({
              method: "get",
              headers: {
                token: window.localStorage.getItem("AccessToken")
              },
              url: url + "/showlist"
            })
              .then(response => {
                this.$eventbus.$emit("refreshdata", response.data);
              })
              .catch(err => {
                console.log("error while getting show list", err);
              });
          }.bind(this)
        )
        .catch(error => {
          console.log(error);
        });
    },
    deleteshow() {
      /* global swal axios url _ */
      swal({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
      }).then(result => {
        if (result.value) {
          axios
            .create({
              baseURL: url,
              headers: { token: window.localStorage.getItem("AccessToken") }
            })
            .post("/deleteshow", { id: this.show._id })
            .then(res => {
              swal("Deleted!", "Show has been deleted.", "success");
              axios({
                method: "get",
                headers: {
                  token: window.localStorage.getItem("AccessToken")
                },
                url: url + "/showlist"
              })
                .then(response => {
                  this.$eventbus.$emit("refreshdata", response.data);
                })
                .catch(err => {
                  console.log("error while getting show list", err);
                });
            })
            .catch(error => {
              console.log(error);
            });
        }
      });
    },
    showstatuschanged(isPublished) {
      axios
        .create({
          baseURL: url,
          headers: { token: window.localStorage.getItem("AccessToken") }
        })
        .post("/ispublished", {
          id: this.show._id,
          isPublished: isPublished
        })
        .then(res => {
          console.log(res);
        })
        .catch(error => {
          console.log(error);
        });
    },
    emitshowdescription(showclicked) {
      this.$eventbus.$emit("showdescription", showclicked);
    },
    duplicateEvent(show) {
      console.log("duplicate show clicked");
      swal({
        title: "Duplicate Show",
        text: "Do you want to duplicate the show!",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Sure!"
      }).then(res => {
        console.log(res.value);
        if (res.value) {
          axios
            .create({
              baseURL: url,
              headers: { token: window.localStorage.getItem("AccessToken") }
            })
            .post("/duplicateShow", show)
            .then(res => {
              console.log(res);
            })
            .catch(err => {
              console.log(error);
            });
        }
      });
    },
    showdatepicker () {
      console.log('date picker clicked')
      let dates = this.show.ShowDate.split(',')
      _.each(dates, (element, index, list) => {
        let date = element.replace(';','')
        list[index] = new Date(date)
      })
      console.log(dates)
     $(`#editshowform${this.show._id} .row`+' .date').datepicker('setDates', dates)
      // $('.date').datepicker('show')
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
            this.show.Ticketdetails = _.without(this.show.Ticketdetails, _.findWhere(this.show.Ticketdetails, {
              TicketType: TicketType
            }))
            swal(
              'Deleted!',
              `Ticket Type:  ${TicketType} has been deleted.`,
              'success'
            )
          }
        })
    },
    addticketpriceEditModal () {
      this.show.Ticketdetails.push({
        'TicketType': $('#TicketTypeEditShow').val(),
        'TicketPrice': $('#TicketPriceEditShow').val()
      })
      document.getElementById('ticketformEdit').reset()
    }
  },
  mounted () {
      // $('.date').datepicker({
      //     container: '#editshow' + this.show._id
      //   })
  },
  watch: {
    show: function(newVal, oldVal) {
      this.ShowDate = moment(newVal.ShowDate, "YYYY-MM-DD").format(
        "MMMM Do YYYY"
      )
      this.ShowTime = moment(newVal.ShowTime, "HH:mm").format("hh:mm a")
    }
  }
};
</script>

<style scoped>
#delete:hover {
  color: #910000;
  background-color: #da7a7a;
}
#delete {
  color: #d14f4f;
  background-color: none;
}
.btn-default.btn-on.active {
  background-color: #5bb75b;
  color: white;
}

.btn-default.btn-off.active {
  background-color: #da4f49;
  color: white;
}

.btn-default.btn-on-1.active {
  background-color: #006ffc;
  color: white;
}

.btn-default.btn-off-1.active {
  background-color: #da4f49;
  color: white;
}

.btn-default.btn-on-2.active {
  background-color: #00d590;
  color: white;
}

.btn-default.btn-off-2.active {
  background-color: #a7a7a7;
  color: white;
}

.btn-default.btn-on-3.active {
  color: #5bb75b;
  font-weight: bolder;
}

.btn-default.btn-off-3.active {
  color: #da4f49;
  font-weight: bolder;
}

.btn-default.btn-on-4.active {
  background-color: #006ffc;
  color: #5bb75b;
}

.btn-default.btn-off-4.active {
  background-color: #da4f49;
  color: #da4f49;
}

.green {
  background-color: rgb(0, 92, 50);
}
.grey {
  background-color: #a9a9a9;
}
.seats_rounded {
  border-radius: 30px;
}
.font1 {
  font-size: 8vw;
}
.card {
  box-shadow: 5px 4px 8px 0 rgba(20, 53, 40, 0.2);
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
  -webkit-transition: 0.4s;
  transition: 0.4s;
}

.slider:before {
  position: absolute;
  content: "";
  height: 26px;
  width: 26px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  -webkit-transition: 0.4s;
  transition: 0.4s;
}

.sliderinput:checked + .slider {
  background-color: green;
}

.sliderinput:focus + .slider {
  box-shadow: 0 0 1px #2196f3;
}

.sliderinput:checked + .slider:before {
  -webkit-transform: translateX(26px);
  -ms-transform: translateX(26px);
  transform: translateX(26px);
}

#date-icon{
  position: absolute;
  right: 35px;
  padding: 2px;
  display: flex;
  align-items: center;
}
#datepicker-input {
  padding-right: 40px;
  outline: none;
}
</style>
