const { Favorite } = require('../DB_connection');

const postFav = async(req,res)=>{
    const { name, origin, status, image, species, gender } = req.body;
    
    if (!name || !origin|| !status|| !image|| !species|| !gender) {
        return res.status(401).json({ message: "Faltan datos" });
      }
    
      try {
         await Favorite.create ({ name, origin, status, image, species, gender });

         const favorites = await Favorite.findAll();
        return res.status(200).json(favorites);
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
    };

    module.exports={
        postFav
    }