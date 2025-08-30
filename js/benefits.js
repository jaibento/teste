// Get the modal elements
var modal = document.getElementById("myModal");
var modal2 = document.getElementById("myModal2");

// Get the buttons that open the modals
var btn = document.getElementById("myBtn");
var btn2 = document.getElementById("myBtn2");

// Get the <span> elements that close the modals
var span1 = document.getElementsByClassName("close")[0];
var span2 = document.getElementsByClassName("close2")[0];

// When the user clicks the button, open the modal 
btn.onclick = function() {
  modal.style.display = "block";
};

btn2.onclick = function() {
  modal2.style.display = "block";
};

// When the user clicks on <span> (x), close the modal
span1.onclick = function() {
  modal.style.display = "none";
};

span2.onclick = function() {
  modal2.style.display = "none";
};

// When the user clicks anywhere outside of the modals, close them
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
  if (event.target == modal2) {
    modal2.style.display = "none";
  }
};
