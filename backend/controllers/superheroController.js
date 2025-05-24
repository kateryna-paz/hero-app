const supabase = require("../services/supabaseService");
const { uploadImageToSupabase } = require("../utils/uploadImageToSupabase");

const getAllSuperheroes = async (req, res) => {
  const { data, error } = await supabase
    .from("superhero")
    .select(
      `
      id,
      nickname,
      images (
        url
      )
    `
    )
    .order("nickname", { ascending: true });

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  const result = data.map((hero) => ({
    id: hero.id,
    nickname: hero.nickname,
    image: hero.images.length > 0 ? hero.images[0].url : null,
  }));

  res.status(200).json(result);
};

const getSuperheroById = async (req, res) => {
  const id = req.params.id;
  const { data, error } = await supabase
    .from("superhero")
    .select(
      `
      *,
      images (
        id,
        url
      )
    `
    )
    .eq("id", id)
    .single();

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  res.status(200).json(data);
};

const addSuperhero = async (req, res) => {
  try {
    const {
      nickname,
      real_name,
      origin_description,
      superpowers,
      catch_phrase,
    } = req.body;

    const { data: heroData, error: heroError } = await supabase
      .from("superhero")
      .insert({
        nickname,
        real_name,
        origin_description,
        catch_phrase,
        superpowers,
      })
      .select();

    if (heroError) throw heroError;

    const heroId = heroData[0].id;

    const imageFiles = req.files;
    if (imageFiles && imageFiles.length > 0) {
      for (const file of imageFiles) {
        const imageUrl = await uploadImageToSupabase(file);
        if (imageUrl) {
          await supabase.from("images").insert({
            hero_id: heroId,
            url: imageUrl,
          });
        }
      }
    }

    res.status(201).json({ message: "Superhero added successfully!" });
  } catch (err) {
    console.error("Add Hero Error:", err);
    res.status(500).json({ error: err.message });
  }
};

const deleteSuperhero = async (req, res) => {
  const id = req.params.id;
  const { error } = await supabase.from("superhero").delete().eq("id", id);
  if (error) {
    return res.status(500).json({ error: error.message });
  }
  res.status(200).json({ message: "Superhero deleted successfully!" });
};

const updateSuperhero = async (req, res) => {
  try {
    const id = req.params.id;
    const {
      nickname,
      real_name,
      origin_description,
      superpowers,
      catch_phrase,
      oldImages,
    } = req.body;

    const updates = {
      nickname,
      real_name,
      origin_description,
      superpowers,
      catch_phrase,
    };

    if (!updates || Object.keys(updates).length === 0) {
      return res.status(400).json({ error: "No fields provided to update." });
    }

    const { data: heroData, error: updateError } = await supabase
      .from("superhero")
      .update(updates)
      .eq("id", id)
      .select();

    if (updateError) throw updateError;

    const heroId = heroData[0].id;

    const previousImages = JSON.parse(oldImages || "[]");

    const { data: existingImages, error: imgFetchErr } = await supabase
      .from("images")
      .select("id")
      .eq("hero_id", heroId);

    if (imgFetchErr) throw imgFetchErr;

    const remainingIds = previousImages.map((img) => img.id);

    const imagesToDelete = existingImages.filter(
      (img) => !remainingIds.includes(img.id)
    );

    if (imagesToDelete.length > 0) {
      const deleteIds = imagesToDelete.map((img) => img.id);
      const { error: deleteError } = await supabase
        .from("images")
        .delete()
        .in("id", deleteIds);
      if (deleteError) throw deleteError;
    }

    const imageFiles = req.files;
    if (imageFiles && imageFiles.length > 0) {
      for (const file of imageFiles) {
        const imageUrl = await uploadImageToSupabase(file);
        if (imageUrl) {
          await supabase.from("images").insert({
            hero_id: heroId,
            url: imageUrl,
          });
        }
      }
    }

    res.status(200).json({ message: "Superhero updated successfully!" });
  } catch (err) {
    console.error("Update error:", err.message);
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  getAllSuperheroes,
  getSuperheroById,
  addSuperhero,
  updateSuperhero,
  deleteSuperhero,
};
