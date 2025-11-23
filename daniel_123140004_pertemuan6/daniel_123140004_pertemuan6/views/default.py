from pyramid.view import view_config
from pyramid.response import Response
from pyramid.httpexceptions import HTTPNotFound, HTTPBadRequest, HTTPCreated, HTTPNoContent
from sqlalchemy.exc import DBAPIError

from ..models import Matakuliah

# --- 1. GET ALL (Ambil semua data) ---
@view_config(route_name='matakuliah_collection', request_method='GET', renderer='json')
def get_all_matakuliah(request):
    try:
        query = request.dbsession.query(Matakuliah)
        matakuliahs = query.all()
        return {'matakuliahs': [mk.to_dict() for mk in matakuliahs]}
    except DBAPIError:
        return Response(json_body={'error': 'Database error'}, status=500)

# --- 2. GET ONE (Ambil satu data) ---
@view_config(route_name='matakuliah_item', request_method='GET', renderer='json')
def get_one_matakuliah(request):
    mk_id = request.matchdict['id']
    mk = request.dbsession.query(Matakuliah).filter_by(id=mk_id).first()
    
    if mk is None:
        raise HTTPNotFound(json_body={'error': 'Matakuliah not found'})
    
    return mk.to_dict()

# --- 3. POST (Tambah data baru) ---
@view_config(route_name='matakuliah_collection', request_method='POST', renderer='json')
def create_matakuliah(request):
    try:
        # Ambil data dari body JSON
        data = request.json_body
        
        # Validasi sederhana
        if not all(k in data for k in ('kode_mk', 'nama_mk', 'sks', 'semester')):
            raise HTTPBadRequest(json_body={'error': 'Missing required fields'})

        new_mk = Matakuliah(
            kode_mk=data['kode_mk'],
            nama_mk=data['nama_mk'],
            sks=int(data['sks']),
            semester=int(data['semester'])
        )
        
        request.dbsession.add(new_mk)
        # Flush untuk mendapatkan ID baru sebelum commit (otomatis oleh TM)
        request.dbsession.flush()
        
        return HTTPCreated(json_body=new_mk.to_dict())
        
    except Exception as e:
        # Tangkap error duplicate key dll
        return Response(json_body={'error': str(e)}, status=400)

# --- 4. PUT (Update data) ---
@view_config(route_name='matakuliah_item', request_method='PUT', renderer='json')
def update_matakuliah(request):
    mk_id = request.matchdict['id']
    mk = request.dbsession.query(Matakuliah).filter_by(id=mk_id).first()
    
    if mk is None:
        raise HTTPNotFound(json_body={'error': 'Matakuliah not found'})
    
    try:
        data = request.json_body
        
        # Update field jika ada di request
        if 'kode_mk' in data: mk.kode_mk = data['kode_mk']
        if 'nama_mk' in data: mk.nama_mk = data['nama_mk']
        if 'sks' in data: mk.sks = int(data['sks'])
        if 'semester' in data: mk.semester = int(data['semester'])
        
        return mk.to_dict()
        
    except Exception as e:
        return Response(json_body={'error': str(e)}, status=400)

# --- 5. DELETE (Hapus data) ---
@view_config(route_name='matakuliah_item', request_method='DELETE', renderer='json')
def delete_matakuliah(request):
    mk_id = request.matchdict['id']
    mk = request.dbsession.query(Matakuliah).filter_by(id=mk_id).first()
    
    if mk is None:
        raise HTTPNotFound(json_body={'error': 'Matakuliah not found'})
    
    request.dbsession.delete(mk)
    return HTTPNoContent()
