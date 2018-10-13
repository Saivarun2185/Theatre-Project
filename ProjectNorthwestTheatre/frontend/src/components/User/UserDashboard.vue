<template>
 <div>
    <div class="modal" id="descriptionmodal" tabindex="-1" role="dialog">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Playwright: {{ show.ShowPlayWright ? show.ShowPlayWright : '' }}</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
                </div>
                <div class="modal-body">
                    <p>{{ show.ShowDescription ? show.ShowDescription : '' }}</p>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                </div>
            </div>
        </div>
    </div>
     <div class="row col-sm-12 ">
        <div class="fixed bg">
      </div>
        <div class=" offset-sm-6 col-sm-3 fixed ">
            <div class="input-group mt-3 ">
                <input class="form-control py-2 border-right-0 border" type="search" v-model="search"  placeholder="Search" id="example-search-input">
                <span class="input-group-append">
                    <div class="input-group-text bg-dark text-light "><i class="fa fa-search"></i></div>
                </span>
            </div>
       
    </div>
      <UserShow class="down" v-for="ele of updatedshowlist" :key="ele._id"  :show="ele" v-if="ele.isPublished">
      </UserShow>
    </div>
    </div>
</template>

<script>
import UserShow from "./UserShow.vue";
/* Saivarun Illendula - Added API Calls */
export default {
  name: "AdminDashboard",
  data() {
    return {
      /* global $ axios url */
      sectionlist: [],
      showlist: [],
      show: "",
      search: ''
    };
  },
  components: {
    UserShow
  },
  methods: {
    showdescriptionmodal() {
      $("#descriptionmodal").modal("show");
    },
    refreshData() {
      var _this = this;
      /* global axios moment _  userurl */
     /*  axios({
        method: "get",
        headers: {
          token: window.localStorage.getItem("AccessToken")
        },
        url: userurl + "/sectionlist"
      })
        .then(function(response) {
          console.log(response.data);
          _this.sectionlist = response.data;
          _.each(_this.sectionlist, function(section) {
            section.ClassTime12hrs = moment(section.ClassTime, "HH:mm").format(
              "hh:mm a"
            );
          });
        })
        .catch(function(err) {
          console.log("error while getting section list", err);
        }); */
      axios({
        method: "get",
        url: userurl + "/showlist"
      })
        .then(function(response) {
          console.log(response.data);
          _this.showlist = response.data;
        })
        .catch(function(err) {
          console.log("error while getting show list", err);
        });
    }
  },
  created() {
    this.refreshData();
    this.$eventbus.$on(
      "refreshdata",
      function(data) {
        this.showlist = data;
        console.log(data, this.showlist);
      }.bind(this)
    );
    this.$eventbus.$on(
      "showdescription",
      function(showclicked) {
        this.show = showclicked;
        console.log("show description", this.show);
        this.showdescriptionmodal();
      }.bind(this)
    );
  },

  computed: {
    updatedshowlist(){
      return this.showlist.filter(show => {
        return show.ShowTitle.toLowerCase().includes(this.search.toLowerCase())
      })
    }
  }

};
</script>

<style scoped>
.fixed{
    position: fixed;
    z-index: 100; 
}

.down{
  top:70px;
}

.bg{
  height: 70px;
  background-color: rgba(182, 221, 208, 0.9);
   background-image: linear-gradient(#f6f4ef, #f6f4ef);
   /* background-image: linear-gradient(207deg, rgba(182, 221, 208, 0.6) , #f6f4ef); */
  width: 100%;
   /* border-bottom: 5px solid rgba(4, 224, 151, 0.521); */
     /* border-bottom-left-radius: 50px ; */
     box-shadow: 0px 10px 5px #f6f4ef;
}
</style>
