## Fitur Utama
Sistem ini memiliki kapabilitas sebagai berikut:
1.  **Add Item**: Menambahkan item baru (Buku atau Majalah) ke dalam koleksi.
2.  **List Items**: Menampilkan seluruh daftar koleksi dengan detail spesifik sesuai tipe item.
3.  **Search**: Mencari item berdasarkan kata kunci (Judul atau ID) secara *case-insensitive*.

## Arsitektur Class (Class Diagram)
Berikut adalah struktur relasi antar class dalam program ini:

```mermaid
classDiagram
    class LibraryItem {
        <<Abstract>>
        -item_id : str
        #title : str
        +item_id() str
        +title() str
        +get_details()* str
    }

    class Book {
        -author : str
        -isbn : str
        +get_details() str
    }

    class Magazine {
        -issue_number : str
        -publisher : str
        +get_details() str
    }

    class Library {
        -catalog : List
        +add_item(item)
        +display_items()
        +search_item(keyword)
    }

    LibraryItem <|-- Book : Inherits
    LibraryItem <|-- Magazine : Inherits
    Library "1" o-- "*" LibraryItem : Aggregates
