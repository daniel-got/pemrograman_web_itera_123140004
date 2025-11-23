def includeme(config):
    config.add_static_view('static', 'static', cache_max_age=3600)
    config.add_route('home', '/')
    
    # Route untuk GET all, POST new
    config.add_route('matakuliah_collection', '/api/matakuliah')
    
    # Route berdasarkan ID (GET one, PUT, DELETE)
    config.add_route('matakuliah_item', '/api/matakuliah/{id}')
