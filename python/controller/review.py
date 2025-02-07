import request.request as req

def add_attraction_review(id, data):
    if (not "rating" in data or data["rating"] == None):
        return False
    
    if (not "comment" in data or data["comment"] == ""):
        return False

    if (not "name" in data or data["name"] is None):
        return False
      
    requete = f"INSERT INTO review (attraction_id, name, surname, comment, rating) VALUES (?,?,?,?,?)"
    id = req.insert_in_db(requete, (id, data['name'], data['surname'], data['comment'], data['rating']))
    
    return id
  
def get_attraction_reviews(id):    
  json = req.select_from_db("SELECT * FROM review WHERE attraction_id=?",(id))
  
  return json