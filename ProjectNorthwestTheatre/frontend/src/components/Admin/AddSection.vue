<!-- Created by Supraja Kumbam -->
<template>
<!-- Keerthi Chiduruppa : Added Card to Add Section -->
<!-- Rahul Reddy Lankala : Added Place holders to Add Section -->
<div class="card m-5">
    <div class="card-header">
      <strong ><h1> Add Section</h1></strong>
    </div>
  <div class="card-body">
      <form class="justify-content-center" @submit.prevent="addsection" id="addsection">
        <div class="form-group row justify-content-center">
          <label class="col-sm-4 text-right form-label">Professor Name:</label>
          <input class="col-sm-4 form-control" type="text" name="ProfessorName" placeholder="Professor Name" id="profname">
        </div>
<!-- Keerthi Chiduruppa : Added check boxes for day -->
      <div class="form-group row justify-content-center">
        <label class="col-sm-4 form-label text-right">Day:</label>
        <div class="col-sm-4" >
            <div class="col-sm-2 form-check form-check-inline justify-content-center">
              <input class="form-check-input " type="checkbox" id="inlineCheckbox1" name="M" value="M">
              <label class="form-check-label justify-content-center" for="inlineCheckbox1">M</label>
            </div>
            <div class="col-sm-1 form-check form-check-inline justify-content-center">
              <input class="form-check-input" type="checkbox" id="inlineCheckbox2" name="T" value="T">
              <label class="form-check-label justify-content-center" for="inlineCheckbox2">T</label>
            </div>
            <div class="col-sm-2 form-check form-check-inline justify-content-center">
              <input class="form-check-input" type="checkbox" id="inlineCheckbox3" name="W" value="W">
              <label class="form-check-label justify-content-center" for="inlineCheckbox3">W</label>
            </div>
            <div class="col-sm-1 form-check form-check-inline justify-content-center">
              <input class="form-check-input" type="checkbox" id="inlineCheckbox3" name="R" value="R">
              <label class="form-check-label justify-content-center" for="inlineCheckbox3">R</label>
            </div>
            <div class="col-sm-2 form-check form-check-inline justify-content-center">
              <input class="form-check-input" type="checkbox" id="inlineCheckbox3" name="F" value="F">
              <label class="form-check-label justify-content-center" for="inlineCheckbox3">F</label>
            </div>
        </div>
      </div>
      <div class="form-group row justify-content-center">
        <label class="col-sm-4 text-right form-label">Section Time:</label>
          <input class="col-sm-4 form-control" type="time"  id="sectiontime" name="ClassTime" required>
      </div>
      <div class="form-group row justify-content-center">
        <label class="col-sm-4 text-right form-label">Section Number:</label>
        <input class="col-sm-4 form-control" type="number" placeholder="Section Number" name="SectionNumber" id="secnumber" >
      </div>
  <!-- Keerthi Chiduruppa : Added radio buttons for semester -->
      <div class="form-group row justify-content-center">
        <label class="col-sm-4 text-right form-label">
        Semester:
        </label>
          <div class="col-sm-4 float-left">
            <div class="form-check form-check-inline col-sm-3">
              <input class="form-check-input" type="radio" name="Semester" id="yes" value="Fall">
              <label class="form-check-label" for="yes">Fall</label>
            </div>
            <div class="form-check form-check-inline col-sm-3">
              <input class="form-check-input" type="radio" name="Semester" id="no" value="Spring">
              <label class="form-check-label" for="no">Spring</label>
            </div>
            <div class="form-check form-check-inline col-sm-3">
              <input class="form-check-input" type="radio" name="Semester" id="no" value="Summer">
              <label class="form-check-label" for="no">Summer</label>
            </div>
          </div>
      </div>
      <div class="form-group row justify-content-center">
        <label class="col-sm-4 text-right form-label">
          Year:
        </label>
        <input class="col-sm-4 form-control" type="number" id="year" :min="mindate" name="Year" required>
      </div>
      <button type="reset" class="btn btn-danger">Reset</button>
      <button type="submit" class="btn btn-success">Add section</button>
    </form>
  </div>
</div>
</template>
<script>
export default {
  name: 'AddSection',
  data () {
    return {
      formdata: {
        ShowRating: ''
      },
      /* global moment */
      mindate: moment().format('YYYY')
    }
  },
  methods: {
    alert (header, msg, type) {
      swal(header, msg, type)
    },

    addsection () {
      var formdata = new FormData(document.querySelector('#addsection'))
      var data = {
        ProfessorName: formdata.get('ProfessorName'),
        ClassDay: '' + (formdata.get('M') ? formdata.get('M') : '') + (formdata.get('T') ? formdata.get('T') : '') + (formdata.get('W') ? formdata.get('W') : '') + (formdata.get('R') ? formdata.get('R') : '') + (formdata.get('F') ? formdata.get('F') : ''),
        ClassTime: formdata.get('ClassTime'),
        SectionNumber: formdata.get('SectionNumber'),
        Semester: formdata.get('Semester'),
        Year: formdata.get('Year')
      }
      /* global axios url swal $ */
      axios.create({
        baseURL: url,
        headers: { 'token': window.localStorage.getItem('AccessToken') }
      }).post('/addsection', data)
        .then(res => {
          this.alert('Congratulations!', 'Section has been added successfully', 'success')
          $('#addsection')[0].reset()
        })
        .catch(error => {
          this.alert(error.response.data, 'Please try again', 'error')
          console.log(error)
        })
    }
  }
}
</script>
<style scoped>
.card {
  width: 80%
}
.required:after {
        content: '*';
        color: red;
    }
</style>
