"use client"

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { deleteArticleApi, getArticleByIdApi, updateArticleApi } from "@/api/article";
import Navbar from "@/components/navbar";
import { Article, categories } from "@/model/article";
import ConfirmDeleteModal from "@/components/confirm.delete.modal";
import { toast } from "react-toastify";
import { useAuth } from "@/hooks/auth.hook";

export default function MyArticleDetail() {

    const params = useParams()
    const router = useRouter()
    const { isUserLoggedIn } = useAuth();

    const id = params.id as string ?? ''

    const [article, setArticle] = useState<Article>();
    const [isModalOpen, setModalOpen] = useState(false);
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [isUpdateLoading, setIsUpdateLoading] = useState<boolean>();
    const [isDeleteLoading, setIsDeleteLoading] = useState<boolean>();
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [form, setForm] = useState({
        title: "",
        content: "",
        category: "",
    });

    const handleChange = (e: any) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleImageChange = (e: any) => {
        const file = e.target.files?.[0];

        if (file) {
            setImageFile(file);
            setImagePreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async () => {
        setIsUpdateLoading(true)
        try {
            await updateArticleApi({ id, ...form, imageFile });
            router.back()
        } catch (ex) {
            toast.error('Error while updating')
        }
        setIsUpdateLoading(false)
    };


    const handleDelete = async () => {
        setModalOpen(false);
        setIsDeleteLoading(true);
        try {
            await deleteArticleApi(id);
            router.back()
        } catch (error) {
            toast.error('Error while deleting')
        }
        setIsDeleteLoading(false);
    };

    useEffect(() => {
        getArticleByIdApi(id).then((data) => { setArticle(data) });
    }, [])

    useEffect(() => {
        if (!isUserLoggedIn) {
            router.push('/login')
            return;
        }

        setForm({
            title: article?.title ?? '',
            content: article?.content ?? '',
            category: article?.category ?? '',
        })
    }, [article, isUserLoggedIn])

    return (
        <>
            <Navbar />
            <div className="space-y-6 my-5 bg-dark-10">
                <hr className="border-gray-60 dark:border-dark-15" />
                <h1 className="max-w-7xl mx-auto text-2xl md:text-2xl lg:text-2xl font-kumbh text-white">
                    Update your Article
                </h1>
                <hr className="border-gray-60 dark:border-dark-15" />
            </div>
            <div className="max-w-7xl mx-auto mt-4 flex flex-col lg:flex-row gap-8 lg:gap-12 overflow-hidden p-6">
                <div className="w-full lg:w-96 flex-shrink-0 space-y-4 bg-dark-15 p-6 rounded-lg">
                    <label className="block text-sm text-gray-60 dark:text-dark-60 font-family-inter">
                        Upload Image
                    </label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="w-full text-white rounded-lg p-3 focus:outline-none border border-dark-20 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:text-black"
                    />
                    {imagePreview && (
                        <img
                            src={imagePreview}
                            alt="Preview"
                            className="w-full h-52 object-cover rounded-lg"
                        />
                    )}
                </div>

                <div className="flex-1 space-y-6">

                    <input
                        type="text"
                        name="title"
                        placeholder="Article Title"
                        value={form.title}
                        onChange={handleChange}
                        className="w-full bg-dark-15 text-white text-2xl font-semibold font-family-kumbh p-3 rounded-lg"
                    />

                    <textarea
                        name="content"
                        placeholder="Article Content"
                        rows={6}
                        value={form.content}
                        onChange={handleChange}
                        className="w-full bg-dark-15 text-white text-sm font-family-inter p-3 rounded-lg resize-none"
                    />

                    <div className="space-y-2 w-2/5">
                        <label className="block text-gray-60 dark:text-dark-60 text-sm font-family-inter">
                            Category
                        </label>
                        <select
                            name="category"
                            value={form.category}
                            onChange={handleChange}
                            className="w-full bg-dark-15 text-white p-3 rounded-lg focus:outline-none"
                        >
                            <option value="" disabled>Select a category</option>
                            {categories.map((cat) => (
                                <option key={cat} value={cat}>{cat}</option>
                            ))}
                        </select>
                    </div>

                    <div className="pt-4 space-x-4">
                        <button onClick={handleSubmit} className="bg-yellow-55 text-black  px-6 py-3 rounded-lg transition-all" >
                            {isUpdateLoading ? <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white" /> : "Update Article"}
                        </button>
                        <button
                            onClick={() => setModalOpen(true)}
                            className="bg-red-500 text-white px-6 py-3 rounded-lg transition-all"
                        >
                            {isDeleteLoading ? <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white" /> : " Delete Article"}
                        </button>
                    </div>
                </div>
            </div>

            <ConfirmDeleteModal
                isOpen={isModalOpen}
                onClose={() => setModalOpen(false)}
                onConfirm={handleDelete}
            />
        </>

    )
}