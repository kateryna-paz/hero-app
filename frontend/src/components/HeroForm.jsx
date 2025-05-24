import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import ImageUploader from "./ImageUploader";
import { schema } from "../utils/addHeroSchema";

function HeroForm({ initialData = {}, onSubmit }) {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      nickname: initialData.nickname || "",
      real_name: initialData.real_name || "",
      origin_description: initialData.origin_description || "",
      superpowers: initialData.superpowers || "",
      catch_phrase: initialData.catch_phrase || "",
      images: Array.isArray(initialData.images) ? initialData.images : [],
    },
    resolver: yupResolver(schema),
  });

  const submitHandler = (data) => {
    onSubmit(data);
  };

  return (
    <form
      onSubmit={handleSubmit(submitHandler)}
      className="space-y-4 max-w-3xl w-3xl"
    >
      <div className="flex justify-between gap-4 pb-2">
        <div className="w-full">
          <label className="block font-medium mb-1">Hero Nickname</label>
          <input
            {...register("nickname")}
            placeholder="Superman"
            className="w-full p-2 border rounded"
          />
          {errors.nickname && (
            <p className="text-red-600 text-sm">{errors.nickname.message}</p>
          )}
        </div>
        <div className="w-full">
          <label className="block font-medium mb-1">Hero Real Name</label>
          <input
            {...register("real_name")}
            placeholder="Clark Kent"
            className="w-full p-2 border rounded"
          />
        </div>
      </div>

      <div>
        <label className="block font-medium mb-1">Hero Description</label>
        <textarea
          {...register("origin_description")}
          placeholder="He was born Kal-El on the planet Krypton..."
          className="w-full p-2 border rounded h-22"
        />
      </div>

      <div>
        <label className="block font-medium mb-1">Hero Superpowers</label>
        <textarea
          {...register("superpowers")}
          placeholder="Flight, heat vision..."
          className="w-full p-2 border rounded h-fit"
        />
      </div>

      <div>
        <label className="block font-medium mb-1">Hero Catch Phrase</label>
        <textarea
          {...register("catch_phrase")}
          placeholder="Look, up in the sky..."
          className="w-full p-2 border rounded"
        />
      </div>

      <div>
        <Controller
          control={control}
          name="images"
          render={({ field }) => (
            <>
              <ImageUploader images={field.value} onChange={field.onChange} />
              {errors.images && (
                <p className="text-red-600 text-sm mt-1">
                  {errors.images.message}
                </p>
              )}
            </>
          )}
        />
      </div>

      <button
        type="submit"
        className="bg-indigo-600 text-white text-lg font-bold px-4 py-3 rounded-xl hover:bg-indigo-700 w-full mt-2 cursor-pointer"
      >
        Save
      </button>
    </form>
  );
}

export default HeroForm;
