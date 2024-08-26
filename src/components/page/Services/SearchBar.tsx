import { Button } from "@/components/ui/button";
import { SearchIcon } from "lucide-react";
import { FieldValues, useForm } from "react-hook-form";

const SearchBar = () => {
    const { register, handleSubmit } = useForm<FieldValues>();

    const onSubmit = (data: FieldValues) => {
        console.log("Search:", data.search);
    };

    return (
        <div className="w-full max-w-md mx-auto">
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="w-full max-w-sm mx-auto"
            >
                <div className="flex items-center border border-gray-300 rounded-md shadow-sm bg-white">


                    <input
                        {...register("search")}
                        className="flex h-10 w-full rounded-md bg-transparent px-3 text-md placeholder:text-gray-600 focus:outline-none   disabled:opacity-50"
                        type="search"
                        name="search"
                        placeholder="Search..."
                        aria-label="Search"
                    />
                    <Button variant={"ghost"} type="submit" className="px-3">
                        <SearchIcon className="size-5" />
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default SearchBar;
