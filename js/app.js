document.querySelector('.searchfield-welshLang').addEventListener('change',function(){

  if(this.checked) {
    window.location.href='05_Results_wl.html';
  }else {
    window.location.href='04_Results_wl.html';
  }

});
