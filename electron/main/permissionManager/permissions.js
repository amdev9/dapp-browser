const electronManager = window.ipc;

if( document.getElementById('permission') ) {
  document.getElementById('permission').innerHTML = JSON.stringify(electronManager.permissions);
}

