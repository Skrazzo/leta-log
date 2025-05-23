import Button from "@/components/Button";
import ContentLabel from "@/components/ContentLabel";
import FormInput from "@/components/FormInput";
import RichTextEditor from "@/components/RichTextEditor";
import SelectedCategories from "@/components/SelectedCategories";
import { AuthLayout } from "@/Layouts/AuthLayout";
import { AuthInfo, Category } from "@/types/Data";
import { useForm } from "@inertiajs/inertia-react";
import { ChangeEvent, useEffect, useState } from "react";

interface Props {
    auth: AuthInfo;
    categories: Category[];
}

export default function CreatePost({ auth, categories }: Props) {
    const [disabledBtn, setDisabledBtn] = useState(false);
    const { data, setData, post, processing, reset, errors } = useForm({
        title: "",
        content: "",
        text: "",
        categories: [] as number[],
    });

    const selectCategoryHandler = (e: ChangeEvent<HTMLSelectElement>) => {
        // Parse selected id, and add it to selected categories, clear selection
        const selectedId = parseInt(e.target.value);
        setData("categories", [...data.categories, selectedId]);
        e.target.value = "0";
    };

    const inputChangeHandler = (field: string, value: string) => {
        setData((prev) => ({ ...prev, [field]: value }));
    };

    const richTextChangeHandler = (html: string, text: string) => {
        setData((prev) => ({ ...prev, content: html, text }));
    };

    const submitHandler = () => {
        console.log(data);
        post("/new");
    };

    useEffect(() => {
        // All fields are required, so we check all fields
        for (const val of Object.values(data)) {
            if (!val || val.length === 0) {
                setDisabledBtn(true);
                return;
            }
        }

        // If all fields are filled, enable button
        setDisabledBtn(false);
    }, [data]);

    return (
        <AuthLayout className="container mx-auto py-8" auth={auth}>
            <h1 className="text-3xl font-bold text-accent">Create new blog post</h1>

            <div className="grid grid-cols-3 mt-8 gap-8">
                <section className="col-span-2 flex flex-col gap-4 rounded-lg">
                    <ContentLabel required label="Title">
                        <FormInput
                            className="w-full bg-white"
                            errors={errors}
                            onChange={inputChangeHandler}
                            name="title"
                        />
                    </ContentLabel>

                    <ContentLabel required label="Content">
                        <RichTextEditor placeholder="Blog post content" onChanged={richTextChangeHandler} />
                    </ContentLabel>
                </section>
                <aside className="col-span-1 ">
                    <div className="flex flex-col gap-2 rounded border border-primary/15 bg-gray-100 p-4">
                        <ContentLabel required label="Categories">
                            <select
                                onChange={selectCategoryHandler}
                                className="border text-secondary border-primary/15 rounded-md p-3"
                                name="cars"
                                id="cars"
                            >
                                <option value="0">Select category to add</option>
                                {categories
                                    .filter((c) => !data.categories.includes(c.id))
                                    .map((c) => (
                                        <option key={c.id} value={c.id}>
                                            {c.name}
                                        </option>
                                    ))}
                            </select>

                            <SelectedCategories
                                onChange={(ids) => setData("categories", ids)}
                                selected={data.categories}
                                categories={categories}
                            />
                        </ContentLabel>
                        <Button onClick={submitHandler} disabled={disabledBtn || processing}>
                            Publish post
                        </Button>
                    </div>
                </aside>
            </div>
        </AuthLayout>
    );
}
