const supabase = require("../services/supabaseService");

const uploadImageToSupabase = async (file) => {
  const ext = file.originalname.split(".").pop();
  const fileName = `${Date.now()}-${Math.random().toString().slice(2)}.${ext}`;

  const { error } = await supabase.storage
    .from("images")
    .upload(fileName, file.buffer, {
      contentType: file.mimetype,
    });

  if (error) {
    console.error("Image upload error:", error.message);
    return null;
  }

  const publicUrl = `${process.env.SUPABASE_URL}/storage/v1/object/public/images/${fileName}`;
  return publicUrl;
};

module.exports = {
  uploadImageToSupabase,
};
