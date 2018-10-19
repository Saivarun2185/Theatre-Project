<template>
   <div>
     <!-- Rahul Reddy Lankala - Added adminList -->
     <div class="tb">
       <h1 class = "h2 mb-3 font-weight-normal">ADMIN List </h1>
        <table class="table table-bordered">
          <thead class="thead-dark">
            <tr>
              <th scope="col">SNO</th>
              <th scope="col">Username</th>
              <th scope="col">Email Address</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(ele,index) of adminlist" :key="ele._id">
              <th scope="row">
                {{ index + 1 }}
              </th>
              <td>
                {{ ele.Username }}
              </td>
              <td>
                {{ ele.Email }}
                <button type="button" class="btn rounded-circle float-right m-2" id="delete" @click="deleteadmin(ele._id)">
                    <i class="fas fa-trash"></i>
                </button>
                <button type="button" class="btn rounded-circle float-right m-2" id="edit" @click="editadmin(ele)">
                    <i class="fas fa-pencil-alt"></i>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
     </div>
     <!-- Keerthi Chiduruppa: Created a modal for edit admin -->
      <!-- Modal -->
    <div class="modal fade" id="editModaladmin" role="dialog" aria-labelledby="editModaladmin" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Edit Admin details</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
          <form id="editModaladminform" @submit.prevent="editadminform">
            <div class="form-group row">
              <label class="col-sm-5 form-label">Username:</label>
              <input class="col-sm-6 form-control" type="text" name="username" :value="admin.Username" id="username" placeholder="Username">
            </div>
            <div class="form-group row">
              <label class="col-sm-5 form-label">Email Address:</label>
              <input class="col-sm-6 form-control" type="text" id="email" name="email" :value="admin.Email" placeholder="Email">
            </div>
            <div class="modal-footer">
              <button type="reset" class="btn btn-danger" data-dismiss="modal">Cancel</button>
              <button type="reset" class="btn btn-primary">Reset</button>
              <button type="submit" class="btn btn-success">Save changes</button>
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
  name: 'AdminList',
  data () {
    return {
      adminlist: [],
      count: 0,
      admin: {}
    }
  },
  methods: {
    editadmin (admin) {
      this.admin = admin
      /* global $ */
      $('#editModaladmin').modal('show')
    },
    editadminform () {
      console.log('edit form clicked')
      var formdata = new FormData(document.querySelector('#editModaladminform'))
      var data = {
        updateusername: formdata.get('username'),
        id: this.admin._id,
        updateemail: formdata.get('email')
      }
      /* global axios url swal */
      axios.create({
        baseURL: url,
        headers: { 'token': window.localStorage.getItem('AccessToken') }
      }).post('/updateadmin', data)
        .then(function (res) {
          $('#editModaladmin').modal('hide')
          swal(
            'Updated!',
            'Admin has been successfully updated.',
            'success'
          )
          axios({
            method: 'get',
            headers: {
              token: window.localStorage.getItem('AccessToken')
            },
            url: url + '/all'
          })
            .then(response => {
              this.adminlist = response.data
              console.log(this.adminlist)
            })
            .catch(err => {
              console.log('error while getting admin list', err)
            })
        }.bind(this))
        .catch(error => {
          console.log(error)
        })
    },
    getlist () {
      /* global axios url */
      axios({
        method: 'get',
        headers: {
          token: window.localStorage.getItem('AccessToken')
        },
        url: url + '/all'
      })
        .then(response => {
          this.adminlist = response.data
          console.log(this.adminlist)
        })
        .catch(err => {
          console.log('error while getting admin list', err)
        })
    },
    storelist (data) {
      this.adminlist = data
      console.log(this.adminlist)
    },
    deleteadmin (adminid) {
      /* global swal axios url */
      swal({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      })
        .then((result) => {
          if (result.value) {
            axios.create({
              baseURL: url,
              headers: { 'token': window.localStorage.getItem('AccessToken') }
            }).post('/deleteadmin', { id: adminid })
              .then(res => {
                swal(
                  'Deleted!',
                  'Selected Admin has been deleted.',
                  'success'
                )
                this.getlist()
              })
              .catch(error => {
                console.log(error)
              })
          }
        })
    }
  },
  created () {
    this.getlist()
    this.$eventbus.$on('admindata', data => {
      this.storelist(data)
    })
  }
}
</script>

<style scoped>
div.tb {
  margin-right: 50px;
}
#delete:hover {
  color: #910000;
  background-color: #DA7A7A
}
#delete {
  color: #D14F4F;
  background-color: none
}
#edit:hover {
  color: #1A1818;
  background-color: #AB9898
}
#edit {
  color: #746967;
  background-color: none
}
/* .modal {
  text-align: center;
}

@media screen and (min-width: 768px) {
  .modal:before {
    display: inline-block;
    vertical-align: middle;
    content: " ";
    height: 100%;
  }
}

.modal-dialog {
  display: inline-block;
  text-align: left;
  vertical-align: middle;
} */
</style>
