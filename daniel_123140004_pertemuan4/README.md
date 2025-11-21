Data mahasiswa disimpan dalam variabel global berupa list of dictionaries (data). Setiap dictionary merepresentasikan satu mahasiswa dengan struktur kunci (key) sebagai berikut:

    name: Nama mahasiswa (String)

    nim: Nomor Induk Mahasiswa (String)

    uts: Nilai Ujian Tengah Semester (Float/Integer)

    uas: Nilai Ujian Akhir Semester (Float/Integer)

    tugas: Nilai Tugas (Float/Integer)

Konfigurasi Bobot Nilai

Perhitungan nilai akhir menggunakan pembobotan statis yang didefinisikan sebagai konstanta:

    Bobot UTS: 30% (0.3)

    Bobot UAS: 40% (0.4)

    Bobot Tugas: 30% (0.3)

Daftar Fungsi

**1. Perhitungan dan Logika Bisnis**

hitung_total_akhir(uts, uas, tugas)

Menghitung nilai akhir numerik berdasarkan formula pembobotan.

    Parameter: Nilai UTS, UAS, dan Tugas.

    Output: Nilai akhir (float) yang dibulatkan 2 desimal.

grading(nilai_akhir)

Mikonversi nilai akhir numerik menjadi grade huruf.

    Logika Konversi:

        A: ≥ 80

        B: ≥ 70

        C: ≥ 60

        D: ≥ 50

        E: < 50

avarage(data)

Menghitung rata-rata nilai akhir seluruh mahasiswa dalam kelas.

    Output: Nilai rata-rata (float) atau 0.0 jika data kosong.

max_nilai(data) & min_nilai(data)

Mencari data mahasiswa dengan nilai akhir tertinggi dan terendah. Fungsi ini mengurutkan data terlebih dahulu sebelum mengambil elemen pertama atau terakhir.

filter_grade(data, target_grading)

Melakukan penyaringan data mahasiswa berdasarkan grade huruf yang diminta.

    Output: List baru berisi dictionary mahasiswa yang memenuhi kriteria grade.

**2. Manajemen Data**

add_data(name, nim, uts, uas, tugas)

Menambahkan data mahasiswa baru ke dalam list global data.

**3. Antarmuka dan Utilitas**
show_data(data_source=None)

Menampilkan data dalam format tabel yang rapi.

    Parameter: data_source (opsional). Jika tidak diisi, akan menggunakan data utama. Jika diisi (misalnya hasil filter), akan menampilkan data tersebut.

cetak_header_tabel()

Fungsi pembantu untuk mencetak garis batas dan judul kolom tabel agar tampilan konsisten.

**4. Menu Interaktif**

a. menu_input_baru()

Menangani input data dari pengguna.

  Fitur Validasi:

  Mencegah duplikasi NIM. Jika NIM sudah ada, pengguna diminta memasukkan ulang.

  Memastikan input nilai berupa angka (menggunakan try-except untuk menangani ValueError).

b. menu_statistik()

Menampilkan ringkasan statistik kelas meliputi rata-rata, mahasiswa dengan nilai tertinggi, dan mahasiswa dengan nilai terendah.

c. menu_filter()

Meminta input grade dari pengguna dan menampilkan daftar mahasiswa yang memiliki grade tersebut.


**Alur Program (Main Loop)**

Fungsi main() berisi perulangan while True yang menampilkan menu utama:

  1. Tampilkan Semua Data: Memanggil show_data().

  2. Tambah Mahasiswa: Memanggil menu_input_baru().

  3. Cari Berdasarkan Grade: Memanggil menu_filter().

  4. Lihat Statistik: Memanggil menu_statistik().

  5. Keluar: Menghentikan program.

Program dijalankan melalui blok if __name__ == "__main__": untuk memastikan fungsi main() dieksekusi saat file dijalankan secara langsung.
