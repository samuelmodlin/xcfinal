var filtered = [];
var numbers = [];
$(document).ready(function(){
  all();
});
$("#about").click(function () {
  $(".aboutContent").show();
  $(".alert").hide();
  $(".mainHeader").hide();
  $(".table-hover").hide();
  $("#search").hide();
  $("#submit").hide();
  $("#aboutLi").addClass('active');
  $("#homeLi").removeClass('active');
});
$("#home").click(function () {
  $(".aboutContent").hide();
  $(".alert").hide();
  $("#search").show();
  $("#submit").show();
  $(".mainHeader").show();
  $(".table-hover").show();
  $("#homeLi").addClass('active');
  $("#aboutLi").removeClass('active');
  update();
});
function all(){
  $("#search").val('');
  $(".mainHeader").show();
  $('#tableBody').html(Handlebars.compile($('#person-template').html())(data));
}
$('#submit').click(function(){
  clear = [];
  $('.alert').show();
  $('.mainHeader').hide();
  query = $("#search").val();
  filtered = data.athletes.filter(function(val,index){
    if(val.firstName.toLowerCase().includes(query.toLowerCase())){
      clear[clear.length] = index;
      return true;
    }
    else if (val.lastName.toLowerCase().includes(query.toLowerCase())){
      clear[clear.length] = index;
      return true;
    }
  });
  displayFiltered(filtered, clear);
});
$(".close").click(function () {
  update();
  $('.alert').hide();
  $('.mainHeader').show();
});
function varsity(){
  clear = [];
  filtered = data.athletes.filter(function(val,index){
    if(val.skill == "Varsity"){
      clear[clear.length] = index;
      return true;
    }
  });
  displayFiltered(filtered, clear);
}
function jv(){
  clear = [];
  filtered = data.athletes.filter(function(val,index){
    if(val.skill == "Junior Varsity"){
      clear[clear.length] = index;
      return true;
    }
  });
  displayFiltered(filtered, clear);
}
function a(){
  clear = [];
  filtered = data.athletes.filter(function(val,index){
    if(val.team == "Team A"){
      clear[clear.length] = index;
      return true;
    }
  });
  displayFiltered(filtered, clear);
}
function b(){
  clear = [];
  filtered = data.athletes.filter(function(val,index){
    if(val.team == "Team B"){
      clear[clear.length] = index;
      return true;
    }
  });
  displayFiltered(filtered, clear);
}
function displayFiltered(filt, num){
  $("#search").val('');

  $('#tableBody').html(Handlebars.compile($('#filtered-template').html())({
    athletes: filt,
    num: num,
  }));
}
function about(){
  $(".mainHeader").hide();
}
$(document).on('change', '#select', function (){
  update();
});
function update(){
  if ($('#select').find(":selected").text()=="All"){
    all();
  } else if ($('#select').find(":selected").text()=="Varsity"){
    varsity();
  } else if ($('#select').find(":selected").text()=="Junior Varsity"){
    jv();
  } else if ($('#select').find(":selected").text()=="A Team"){
    a();
  } else if ($('#select').find(":selected").text()=="B Team"){
    b();
  }
}
$(document).on('click', 'tbody tr', function (){
  $('.modalDiv').html(Handlebars.compile($('#modal-template').html())(data.athletes[$(this).attr('id')]));
  $('#personModal').modal('show');
});
