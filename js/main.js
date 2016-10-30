// Panggil Fungsi Buat Tabel
buatTabel();

// Inisiasi Awal Fungsi
buatLingkaran(5,10,10);
//buatBresenham(10,10,150,150);
//buatDDA(10,10,150,150);

$(document).ready(function(){
  // Binding Tombol Buat
  $(document).on('click','#btn-buat-dda',function(){

    resetTabel();

    //Terima Value dari HTML
    var dda_x1 = parseInt($('#dda-x1').val());
    var dda_x2 = parseInt($('#dda-x2').val());
    var dda_y1 = parseInt($('#dda-y1').val());
    var dda_y2 = parseInt($('#dda-y2').val());

    //Kirim untuk Eksekusi
    buatDDA(dda_x1 ,dda_y1 ,dda_x2 ,dda_y2)
  });
  $(document).on('click','#btn-buat-bresenham',function(){

    resetTabel();

    //Terima Value dari HTML
    var bres_x1 = parseInt($('#bres-x1').val());
    var bres_x2 = parseInt($('#bres-x2').val());
    var bres_y1 = parseInt($('#bres-y1').val());
    var bres_y2 = parseInt($('#bres-y2').val());

    //Kirim untuk Eksekusi
    buatBresenham(bres_x1 ,bres_y1 ,bres_x2 ,bres_y2)
  });
  $(document).on('click','#btn-buat-circle',function(){

    resetTabel();

    //Terima Value dari HTML
    var circle_r = parseInt($('#circle-r').val());
    var circle_xc = parseInt($('#circle-xc').val());
    var circle_yc = parseInt($('#circle-yc').val());

    //Kirim untuk Eksekusi
    buatLingkaran(circle_r,circle_xc,circle_yc);
  });
  $(document).on('click','#btn-reset',function(){
    resetTabel();
  });

});

// Buat Table sebagai Piksel
function buatTabel(){
  var table = document.getElementById("tabel");

  var baris = 25;
  var kolom = 25;
  for(var x = 0;x < baris;x++){
    var tr = document.createElement("tr");
    tr.setAttribute("class","pixel x");
    tr.setAttribute("id","row-"+x);
    table.appendChild(tr);

    for(var y = 0;y < kolom;y++){
      var td = document.createElement("td");
      td.setAttribute("class","pixel y");
      td.setAttribute("id",y);
      var t = tr.appendChild(td);
    }
  }
}

function resetTabel() {
  //Hapus Table
  $('#tabel').empty();
  // Buat Ulang Tabel
  buatTabel();
}

// Algoritma Lingkaran
function buatLingkaran(r, xc, yc){
  // Deklarasi Variabel
  var r,xc,yc,p,x,y;

  // Titik Awal
  p = 1-r;
  x = 0;
  y = r;

  while (x <= y) {
    x = x+1;
    if (p < 0){
      p += 2 * x + 1;
    } else {
      y = y - 1;
      p += 2 * (x - y) + 1;
    }

    // Gambar Titik
    setInterval(buatTitik(xc + x,yc +y),1000);
    setInterval(buatTitik(xc - x,yc +y),1000);
    setInterval(buatTitik(xc + x,yc -y),1000);
    setInterval(buatTitik(xc - x,yc -y),1000);
    setInterval(buatTitik(xc + y,yc +x),1000);
    setInterval(buatTitik(xc - y,yc +x),1000);
    setInterval(buatTitik(xc + y,yc -x),1000);
    setInterval(buatTitik(xc - y,yc -x),1000);
  }
}

function buatBresenham(x1 ,y1 ,x2 ,y2) {
  var x1, y1, x2, y2, x, y, dx, dy, xend, p, duady, duadydx;
  
  //tentukan titik awal dan akhir
  x = x1;
  y = y1;

  //hitung dx dan dy
  dx = Math.abs(x2 - x1);
  dy = Math.abs(y2 - y1);
  
  //hitung p 
  p = 2 * dy - dx;
  duady = 2 * dy;
  duadydx = 2 * (dy - dx);
  
  //tentukan titik awal dan akhir
  if (x1 > x2) {
    x = x2;
    y = y2;
    xend = x1;
  }
  else
  {
    x = x1;
    y = y1;
    xend = x2;
  }

  //gambar titik awal
  setInterval(buatTitik(x,y),1000);

  //perulangan untuk menggambar titik-titik 
  while (x < xend) {
    x++;
    if (p < 0) {
      p += duady;
    }
    else
    {
      if (y1 > y2) {
        y--;
      }
      else y++;
    
      p += duadydx;
    }
    setInterval(buatTitik(x,y),1000);
  }
}

function buatDDA(x1 ,y1 ,x2 ,y2) {
  var x1, y1, x2, y2, x,y,dx, dy, steps, x_inc, y_inc;
  //tentukan titik awal dan akhir
  x = x1;
  y = y1;

  //hitung dx dan dy
  dx = x2 - x1;
  dy = y2 - y1;

  //hitung steps
  if (dx > dy) {
    steps = dx;
  }
  else steps = dy;

  //hitung perubahan nilai x (x_inc) dan y (y_inc)
  x_inc = dx / steps;
  y_inc = dy / steps;

  //gambar titik awal
  setInterval(buatTitik(x,y),1000);

  //perulangan untuk menggambar titik-titik 
  do {
    x += x_inc; // x = x + x_inc
    y += y_inc; // y = y + y_inc
    setInterval(buatTitik(Math.round(x),Math.round(y)),1000);
  } while (x < x2);
}

// Fungsi untuk Menentukan Posisi Titik pada Tabel Piksel.
function buatTitik(x,y){
  var row = $("#row-"+y+" #"+x).css('backgroundColor','orange');
}
