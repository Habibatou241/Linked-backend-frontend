import React from 'react';
import Navbar from '../../components/Navbar';

const Contact = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <>
      
      <div className="min-h-screen bg-[#FFF3E0] pt-16">
        {/* Header Image Section */}
        <div className="h-85 bg-gray-800 relative">
          <img 
            src="/contact.png" 
            alt="Contact" 
            className="w-full h-full object-cover opacity-70"
          />
          <h1 className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-3xl font-semibold">
            Informations contact
          </h1>
        </div>

        <div className="container mx-auto px-4 py-5">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl text-center font-semibold text-[#8B4513] mb-8">
              Comment pouvons-nous vous aider ?
            </h2>

            <div className="flex flex-col md:flex-row gap-5">
              {/* Contact Information - Outside the form div */}
              <div className="md:w-1/2 space-y-6">
                <p className="text-[#8B4513] text-sm mb-8 max-w-[300px] leading-relaxed">
                  N'hésitez pas à nous faire part de vos<br />
                  commentaires, idées ou à poser des questions<br />
                  en remplissant le formulaire ci-contre et nous<br />
                  vous répondrons dans les plus brefs délais.
                </p>

                <div className="space-y-6">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-[#1E3C58] rounded-full flex items-center justify-center">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-semibold text-[#1E3C58]">Phone</p>
                      <span>+237 691617351</span>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-[#1E3C58] rounded-full flex items-center justify-center">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-semibold text-[#1E3C58]">Email</p>
                      <span>pep@gmail.com</span>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-[#1E3C58] rounded-full flex items-center justify-center">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-semibold text-[#1E3C58]">Addresse</p>
                      <span>Douala, Cameroun</span>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-[#1E3C58] rounded-full flex items-center justify-center">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-semibold text-[#1E3C58]">Instagram</p>
                      <span>pep.com</span>
                    </div>
                  </div>
                </div>

                <div className="mt-12">
                  <div className="w-full h-[1px] bg-gray-300 mb-8"></div>
                  <p className="font-semibold text-[#1E3C58] text-xl mb-4">Social Media</p>
                  <div className="flex space-x-6">
                    <a href="#" className="bg-[#c0601c] p-2 rounded-lg hover:opacity-80">
                      <svg className="w-6 h-6 text-[#fad9c1]" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"/>
                      </svg>
                    </a>
                    <a href="#" className="bg-[#c0601c] p-2 rounded-lg hover:opacity-80">
                      <svg className="w-6 h-6 text-[#fad9c1]" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"/>
                      </svg>
                    </a>
                    <a href="#" className="bg-[#c0601c] p-2 rounded-lg hover:opacity-80">
                      <svg className="w-6 h-6 text-[#fad9c1]" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/>
                      </svg>
                    </a>
                    <a href="#" className="bg-[#c0601c] p-2 rounded-lg hover:opacity-80">
                      <svg className="w-6 h-6 text-[#fad9c1]" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                      </svg>
                    </a>
                  </div>
                </div>
              </div>

              {/* Contact Form */}
              <div className="md:w-1/2 bg-[#FFF3E0] p-6 rounded-lg">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[#8B4513] text-sm mb-1">Nom*</label>
                      <input
                        type="text"
                        placeholder="Entrez votre nom"
                        className="p-2 border rounded-md bg-[#fad9c1] w-full"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-[#8B4513] text-sm mb-1">Prénom*</label>
                      <input
                        type="text"
                        placeholder="Entrez votre prénom"
                        className="p-2 border rounded-md bg-[#fad9c1] w-full"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-[#8B4513] text-sm mb-1">Email*</label>
                    <input
                      type="email"
                      placeholder="Entrez votre email"
                      className="p-2 border rounded-md bg-[#fad9c1] w-full"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-[#8B4513] text-sm mb-1">Sujet*</label>
                    <input
                      type="text"
                      placeholder="Entrez l'objet de votre message"
                      className="p-2 border rounded-md w-full bg-[#fad9c1]"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-[#8B4513] text-sm mb-1">Message*</label>
                    <textarea
                      placeholder="Écrivez votre message ici..."
                      rows="4"
                      className="p-2 border rounded-md bg-[#fad9c1] w-full"
                      required
                    ></textarea>
                  </div>
                  <button
                    type="submit"
                    className="bg-[#c0601c] text-white px-8 py-2 rounded-md hover:bg-[#c0601c]/90 transition-colors w-full"
                  >
                    Envoyer
                  </button>
                </form>
              </div>
            </div>

            {/* Map section should be the last div before closing */}
            <div className="mt-12 h-64 bg-gray-200 rounded-lg overflow-hidden">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d63695.85392419998!2d9.685216674664286!3d4.050297600000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1061128914e2b3c3%3A0x5e7b9e207c7f7d89!2sDouala%2C%20Cameroon!5e0!3m2!1sen!2s!4v1635927272000!5m2!1sen!2s"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;