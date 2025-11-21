# data awal untuk inisiasi
data = [
        {'name': 'Daniel', 'nim':'104', 'uts':80, 'uas': 90, 'tugas':100},
        {'name': 'Nanin', 'nim':'119', 'uts':90, 'uas': 90, 'tugas':95},
        {'name': 'Rauf', 'nim':'132', 'uts':60, 'uas': 55, 'tugas':98},
        {'name': 'Dakim', 'nim':'102', 'uts':70, 'uas': 60, 'tugas':100},
        {'name': 'Akbar', 'nim':'103', 'uts':80, 'uas': 80, 'tugas':70}
]

#konstanta bobot nilai 
bobot_uts= 0.3
bobot_uas=0.4
bobot_tugas=0.3

#fungsi-fungsi yang digunakan 
#untuk mendapatkan nilai akhir dari mahasiswa
def hitung_total_akhir(uts,uas,tugas):
    nilai= (uts*bobot_uts)+(uas*bobot_uas)+(tugas*bobot_tugas)
    return round(nilai,2)

#fungsi mencari rata-rata dari seluruh data 
def avarage(data):
    if not data: return 0.0 

    total = sum((hitung_total_akhir(m['uts'],m['uas'],m['tugas']) for m in data))

    return round(total/len(data), 2)

#grading untuk nilai akhir
def grading (nilai_akhir):
    if nilai_akhir >=80:return 'A'
    elif nilai_akhir>=70 : return 'B'
    elif nilai_akhir >= 60 : return 'C'
    elif nilai_akhir >= 50 : return 'D'
    else :return 'E'

#mendapatkan data nilai tertinggi
def max_nilai(data):
    sorted_nilai= sorted(data, key=lambda m: hitung_total_akhir(m['uts'], m['uas'], m['tugas']), reverse = True)

    #menampilkan data paling awal 
    return sorted_nilai[0]

#mendapatkan data nilai terendah
def min_nilai(data):
    sorted_nilai= sorted(data, key=lambda m: hitung_total_akhir(m['uts'], m['uas'], m['tugas']), reverse = True)

    #menampilkan data paling akhir, jika reverse = false maka ganti index sorted_nilai menjadi 0
    #sorted_nilai[0]['name']
    return sorted_nilai[-1]

#fungsi filtering by grade,mengembalikan daftar yang telah difilter dalam bentuk list 
def filter_grade(data, target_grading):
    filtered = []

    for mhs in data :
        nilai_akhir = hitung_total_akhir(mhs['uts'], mhs['uas'], mhs['tugas'])
        grade = grading(nilai_akhir)

        #jika grade sama dengan yang difilter maka masukkan ke list
        if grade.upper() == target_grading.upper() :
            filtered.append(mhs)

    return filtered

#add data sesuai dengan key pada list
def add_data(name, nim, uts, uas, tugas):
    mahasiswa_baru = {
        'name': name,
        'nim': nim,
        'uts': uts,
        'uas': uas,
        'tugas': tugas
    }
    data.append(mahasiswa_baru)

#utility kode 
#border tabel 
def cetak_header_tabel():
    print("-" * 75)
    print(f"| {'NIM':<10} | {'Nama':<15} | {'UTS':<5} | {'UAS':<5} | {'Tgs':<5} | {'Akhir':<6} | {'Grade':<5} |")
    print("-" * 75)

#tampilkan data
def show_data(data_source=None):
    if data_source is None:
        data_source = data

    if not data_source:
        print("\n[!] Data kosong.")
        return

    cetak_header_tabel()
    for mhs in data_source:
        na = hitung_total_akhir(mhs['uts'], mhs['uas'], mhs['tugas'])
        gr = grading(na)
        print(f"| {mhs['nim']:<10} | {mhs['name']:<15} | {mhs['uts']:<5} | {mhs['uas']:<5} | {mhs['tugas']:<5} | {na:<6} | {gr:<5} |")
    print("-" * 75)

#menu input data dibuat modular agar mudah dibaca 
def menu_input_baru():
    print("\n--- Input Data Mahasiswa Baru ---")
    try:
        name = input("Nama  : ")
        while True:
            nim_input = input("NIM   : ") 
            if any(m['nim'] == nim_input for m in data):
                print(f"[!] Error: NIM {nim_input} sudah ada! Masukkan NIM lain.")
            else:
                # Jika tidak ada duplikat, keluar dari loop validasi
                break
        uts = float(input("Nilai UTS   : "))
        uas = float(input("Nilai UAS   : "))
        tugas = float(input("Nilai Tugas : "))
        
        add_data(name, nim_input, uts, uas, tugas)
        print("\n[v] Data berhasil disimpan!")
    except ValueError:
        print("\n[x] Error: Nilai harus berupa angka!")

#menu Statistik agar mudah dibaca dibuat modular
def menu_statistik():
    print("\n--- Statistik Kelas ---")
    rata = avarage(data)
    tertinggi = max_nilai (data)
    terendah = min_nilai(data)
    
    print(f"Rata-rata Kelas : {rata}")
    
    print(f"Nilai Tertinggi : {tertinggi['name']} ({hitung_total_akhir(tertinggi['uts'], tertinggi['uas'], tertinggi['tugas'])})")
    print(f"Nilai Terendah  : {terendah['name']} ({hitung_total_akhir(terendah['uts'], terendah['uas'], terendah['tugas'])})")

#menu filter dibuat modular agar mudah dibaca
def menu_filter():
    g = input("\nMasukkan Grade yang ingin dicari (A/B/C/D/E): ")
    hasil = filter_grade(data, g)
    
    print(f"\n--- Hasil Filter Grade {g.upper()} ---")
    show_data(hasil)

#main menu (looping till type ' keluar')
def main():
    while True:
        print("\n=== SISTEM PENGELOLAAN NILAI MAHASISWA ===")
        print("1. Tampilkan Semua Data")
        print("2. Tambah Mahasiswa")
        print("3. Cari Berdasarkan Grade")
        print("4. Lihat Statistik (Rata-rata & Max/Min)")
        print("5. Keluar")
        
        pilihan = input("Pilih menu (1-5): ")
        
        if pilihan == '1':
            show_data()
        elif pilihan == '2':
            menu_input_baru()
        elif pilihan == '3':
            menu_filter()
        elif pilihan == '4':
            menu_statistik()
        elif pilihan == '5':
            print("Program selesai.")
            break
        else:
            print("[!] Pilihan tidak valid.")


if __name__ == "__main__":
    main()
