from abc import ABC, abstractmethod
from typing import List

class LibraryItem(ABC):
    def __init__(self, item_id: str, title: str):
        # Encapsulation: __item_id bersifat PRIVATE (hanya bisa diakses di class ini)
        self.__item_id = item_id 
        # Encapsulation: _title bersifat PROTECTED (bisa diakses oleh subclass)
        self._title = title

    #Getter untuk atribut private
    @property
    def item_id(self):
        return self.__item_id

    @property
    def title(self):
        return self._title

    @abstractmethod
    def get_details(self) -> str:
        pass


#SUBCLASSES & INHERITANCE
class Book(LibraryItem):
    def __init__(self, item_id: str, title: str, author: str, isbn: str):
        super().__init__(item_id, title)
        self._author = author
        self._isbn = isbn

    # Polymorphism
    def get_details(self) -> str:
        return f"[Buku] ID: {self.item_id} | Judul: {self._title} | Penulis: {self._author} | ISBN: {self._isbn}"


class Magazine(LibraryItem):
    def __init__(self, item_id: str, title: str, issue_number: str, publisher: str):
        super().__init__(item_id, title)
        self._issue_number = issue_number
        self._publisher = publisher

    # Polymorphism
    def get_details(self) -> str:
        return f"[Majalah] ID: {self.item_id} | Judul: {self._title} | Edisi: {self._issue_number} | Penerbit: {self._publisher}"


class Library:
    def __init__(self):
        # Encapsulation
        self.__catalog: List[LibraryItem] = []

    def add_item(self, item: LibraryItem):
        if isinstance(item, LibraryItem):
            self.__catalog.append(item)
            print(f"Sukses: '{item.title}' berhasil ditambahkan ke perpustakaan.")
        else:
            print("Error: Objek tidak valid.")

    def display_items(self):
        print("\n--- Daftar Koleksi Perpustakaan ---")
        if not self.__catalog:
            print("Katalog kosong.")
        else:
            for item in self.__catalog:
                # Polymorphism
                print(item.get_details())
        print("----------------------------------")

    def search_item(self, keyword: str):
        print(f"\n--- Hasil Pencarian: '{keyword}' ---")
        found = False
        for item in self.__catalog:
            if keyword.lower() in item.title.lower() or keyword.lower() in item.item_id.lower():
                print(item.get_details())
                found = True
        
        if not found:
            print("Item tidak ditemukan.")


if __name__ == "__main__":
    # 1. Inisialisasi Perpustakaan
    my_library = Library()

    # 2. Membuat Objek Buku dan Majalah
    buku1 = Book("B001", "Belajar Python OOP", "Guido van Rossum", "978-3-16-148410-0")
    buku2 = Book("B002", "Clean Code", "Robert C. Martin", "978-0-13-235088-4")
    majalah1 = Magazine("M001", "Tech Asia", "Edisi Nov 2025", "Tech Corp")

    # 3. Menambahkan ke Perpustakaan
    print("=== Menambahkan Item ===")
    my_library.add_item(buku1)
    my_library.add_item(buku2)
    my_library.add_item(majalah1)

    # 4. Menampilkan Daftar (List)
    my_library.display_items()

    # 5. Mencari Item (Search)
    # Test cari berdasarkan judul
    my_library.search_item("Python") 
    # Test cari berdasarkan ID
    my_library.search_item("M001") 
    # Test cari yang tidak ada
    my_library.search_item("Java") 

    # 6.Encapsulation Check
    # print(buku1.__item_id) #Error jika di-uncomment
