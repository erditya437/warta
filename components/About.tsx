// components/About.tsx

import React from 'react';
// Tambahkan ikon Code, Terminal, dan Type
import { Bot, Search, Zap, Code, Terminal, Type } from 'lucide-react'; 

// Catatan: Path foto profile tetap di sini, karena ini adalah file lokal Anda.
const profileImageUrl = '/profile.jpg'; 

// Komponen untuk ikon React (Menggunakan ikon Code dari Lucide)
const ReactIcon = () => (
    <div className="p-3 bg-blue-100 rounded-full flex items-center justify-center">
        <Code className="w-6 h-6 text-blue-600" /> 
    </div>
);

// Komponen untuk ikon TypeScript (Menggunakan ikon Type atau Terminal dari Lucide)
const TypescriptIcon = () => (
    <div className="p-3 bg-indigo-100 rounded-full flex items-center justify-center">
         <Type className="w-6 h-6 text-indigo-600" /> 
    </div>
);


export const About: React.FC = () => {
    return (
        <div className="max-w-6xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
            {/* DIUBAH: text-4xl menjadi text-3xl sm:text-4xl */}
            <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 text-center mb-10">
                Tentang Warta
            </h1>

            <div className="bg-white shadow-xl rounded-2xl overflow-hidden p-8 sm:p-10 border border-slate-100">
                
                {/* Developer Profile */}
                <section className="mb-10 text-center">
                    <div className="flex justify-center mb-6">
                        <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-blue-500 shadow-lg">
                           <img src="/download (1).jpg" alt="Foto Profile Developer" className="w-full h-full object-cover" />
                        </div>
                    </div>
                    {/* DIUBAH: text-2xl menjadi text-xl sm:text-2xl */}
                    <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-2">
                        Dikembangkan oleh
                    </h2>
                    {/* DIUBAH: text-3xl menjadi text-2xl sm:text-3xl */}
                    <p className="text-2xl sm:text-3xl font-bold text-blue-600">
                        Erditya Megantoro
                    </p>
                    {/* DIUBAH: text-md menjadi text-sm sm:text-md */}
                    <p className="text-sm sm:text-md text-slate-500 mt-1">
                        Pengembang Aplikasi Berbasis AI
                    </p>
                </section>

                <hr className="my-8 border-slate-200" />

                {/* Technology Section */}
                <section>
                    {/* DIUBAH: text-2xl menjadi text-xl sm:text-2xl */}
                    <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-8 text-center">
                        Teknologi di Balik WartaAI
                    </h2>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                        
                        {/* Kolom AI */}
                        <div>
                            {/* DIUBAH: text-xl menjadi text-lg sm:text-xl */}
                            <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4 flex items-center">
                                <Zap className="w-5 h-5 mr-2 text-indigo-500" /> Kecerdasan Buatan (AI)
                            </h3>
                            <div className="space-y-6">
                                <div className="flex items-start space-x-4">
                                    <div className="p-3 bg-indigo-100 rounded-full">
                                        <Bot className="w-6 h-6 text-indigo-600" />
                                    </div>
                                    <div>
                                        {/* DIUBAH: text-lg menjadi text-base sm:text-lg */}
                                        <h4 className="text-base sm:text-lg font-semibold text-gray-900">Gemini AI API</h4>
                                        {/* DIUBAH: text-slate-600 tanpa ukuran menjadi text-sm sm:text-base */}
                                        <p className="mt-1 text-sm sm:text-base text-slate-600">
                                            Menggunakan model Gemini 2.5 Flash untuk menganalisis, merangkum, dan menyajikan inti berita secara ringkas.
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-start space-x-4">
                                    <div className="p-3 bg-blue-100 rounded-full">
                                        <Search className="w-6 h-6 text-blue-600" />
                                    </div>
                                    <div>
                                        {/* DIUBAH: text-lg menjadi text-base sm:text-lg */}
                                        <h4 className="text-base sm:text-lg font-semibold text-gray-900">Google Search Grounding</h4>
                                        {/* DIUBAH: text-slate-600 tanpa ukuran menjadi text-sm sm:text-base */}
                                        <p className="mt-1 text-sm sm:text-base text-slate-600">
                                            Memastikan informasi yang disajikan faktual dan terkini dengan melakukan pencarian web secara *real-time*.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Kolom Frontend */}
                        <div>
                             {/* DIUBAH: text-xl menjadi text-lg sm:text-xl */}
                             <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4 flex items-center">
                                <Zap className="w-5 h-5 mr-2 text-blue-500" /> Pengembangan Web (Frontend)
                            </h3>
                            <div className="space-y-6">
                                <div className="flex items-start space-x-4">
                                    <ReactIcon /> {/* Menggunakan ikon Code */}
                                    <div>
                                        {/* DIUBAH: text-lg menjadi text-base sm:text-lg */}
                                        <h4 className="text-base sm:text-lg font-semibold text-gray-900">React</h4>
                                        {/* DIUBAH: text-slate-600 tanpa ukuran menjadi text-sm sm:text-base */}
                                        <p className="mt-1 text-sm sm:text-base text-slate-600">
                                            Aplikasi ini dibangun menggunakan pustaka JavaScript React untuk antarmuka pengguna yang cepat, modular, dan reaktif.
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-start space-x-4">
                                    <TypescriptIcon /> {/* Menggunakan ikon Type */}
                                    <div>
                                        {/* DIUBAH: text-lg menjadi text-base sm:text-lg */}
                                        <h4 className="text-base sm:text-lg font-semibold text-gray-900">TypeScript</h4>
                                        {/* DIUBAH: text-slate-600 tanpa ukuran menjadi text-sm sm:text-base */}
                                        <p className="mt-1 text-sm sm:text-base text-slate-600">
                                            Menggunakan superset JavaScript ini untuk pengetikan statis, yang meningkatkan keandalan dan kualitas kode selama pengembangan.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};