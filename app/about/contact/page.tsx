'use client';

import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import ContentPageLayout from '@/components/ContentPageLayout';
import InquiryForm from '@/components/features/InquiryForm';
import { aboutSubNav } from '@/lib/subNavConfig';

export default function ContactPage() {
    return (
        <ContentPageLayout
            title="입학 상담 및 문의"
            subtitle="마닐라한국아카데미에 대해 궁금한 점이 있으신가요? 언제든 문의해주세요."
            subNav={aboutSubNav}
        >
            <div className="max-w-6xl mx-auto">
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
                    {/* Contact Info Section */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                            <div className="w-1 h-8 bg-[#D4AF37]" />
                            Contact Information
                        </h3>

                        <div className="space-y-8 mb-12">
                            <div className="flex items-start gap-4 group">
                                <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-blue-400 group-hover:bg-blue-600 group-hover:text-white transition-colors backdrop-blur-sm">
                                    <MapPin className="w-6 h-6" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-white mb-1">Address</h4>
                                    <p className="text-slate-300 leading-relaxed">
                                        Manila Hankuk Academy<br />
                                        Upper McKinley Road, McKinley Hill,<br />
                                        Taguig City, Metro Manila, Philippines
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4 group">
                                <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-blue-400 group-hover:bg-blue-600 group-hover:text-white transition-colors backdrop-blur-sm">
                                    <Phone className="w-6 h-6" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-white mb-1">Phone</h4>
                                    <p className="text-slate-300">02-8888-1234 (행정실)</p>
                                    <p className="text-slate-300">070-1234-5678 (인터넷 전화)</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4 group">
                                <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-blue-400 group-hover:bg-blue-600 group-hover:text-white transition-colors backdrop-blur-sm">
                                    <Mail className="w-6 h-6" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-white mb-1">Email</h4>
                                    <p className="text-slate-300">admissions@mha.edu.ph</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4 group">
                                <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-blue-400 group-hover:bg-blue-600 group-hover:text-white transition-colors backdrop-blur-sm">
                                    <Clock className="w-6 h-6" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-white mb-1">Office Hours</h4>
                                    <p className="text-slate-300">Mon - Fri: 8:00 AM - 4:00 PM</p>
                                    <p className="text-slate-400 text-sm mt-1">* 주말 및 공휴일 휴무</p>
                                </div>
                            </div>
                        </div>

                        {/* Map Placeholder - Could be replaced with Google Maps Embed */}
                        <div className="aspect-video bg-gray-800 rounded-2xl overflow-hidden border border-white/10 relative group">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3861.866768668889!2d121.0486963153565!3d14.53289998984575!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3397c8c8c8c8c8c9%3A0x1234567890abcdef!2sManila%20Hankuk%20Academy!5e0!3m2!1sen!2sph!4v1620000000000!5m2!1sen!2sph"
                                width="100%"
                                height="100%"
                                style={{ border: 0 }}
                                allowFullScreen
                                loading="lazy"
                                className="grayscale group-hover:grayscale-0 transition-all duration-500 opacity-80 group-hover:opacity-100"
                            ></iframe>
                        </div>
                    </motion.div>

                    {/* Inquiry Form Section */}
                    <div className="lg:mt-0">
                        <InquiryForm />
                    </div>
                </div>
            </div>
        </ContentPageLayout>
    );
}
