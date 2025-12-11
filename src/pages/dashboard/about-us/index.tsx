import { useEffect, useState } from 'react';
import NoteTab from '../../../components/shared/NoteTab';
import { useAddSupportContentMutation, useGetSupportContentQuery } from '../../../redux/apiSlices/settingSlice';
import { toast } from 'sonner';

export default function AboutUs() {
    const { data: supportContent, refetch } = useGetSupportContentQuery({
        type: 'about',
    });
    const [content, setContent] = useState('');
    const [addSupportContent] = useAddSupportContentMutation();
    const handleSaveChanges = () => {
        const newContent = {
            content: content,
            type: 'about',
        };
        toast.promise(addSupportContent({ data: newContent }).unwrap(), {
            loading: 'Saving changes...',
            success: (res) => {
                refetch();
                return <b>{res.message}</b>;
            },
            error: (err: any) => `Error: ${err.message || 'Something went wrong'}`,
        });
    };

    useEffect(() => {
        if (supportContent) {
            setContent(supportContent?.data?.content || '');
        }
    }, [supportContent?.data]);

    return (
        <div className="px-3 flex flex-col gap-4">
            <h4 className="text-2xl font-semibold py-3 text-white">About Us</h4>
            <NoteTab content={content} handleContentChange={setContent} />
            <button
                onClick={handleSaveChanges}
                className="bg-primary h-12 w-full rounded-md text-white text-lg font-semibold"
            >
                Save
            </button>
        </div>
    );
}
