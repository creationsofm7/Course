"use client";
import { useRouter } from "next/navigation";

interface CourseFetchTestProps {
    courseid: string;
    courseName: string;
}




export default function CourseFetchTest({ courseid, courseName }: CourseFetchTestProps) {

    const router = useRouter();

    return (
        <div>
            <button className="text-l font-semibold text-gray-800 mb-3 hover:text-gray-600" onClick={() => {
                router.push(`/cooklab/${courseid}`);
            }}>{courseName}</button>
        </div>
    );
}