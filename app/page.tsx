import NewsTicker from './components/NewsTicker'
import WeatherWidget from './components/WeatherWidget'
import RadioPlayer from './components/RadioPlayer'

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-blue-600">
              التوانســـة اليوم
            </h1>
            <div className="flex gap-4">
              <button className="px-4 py-2 bg-blue-600 text-white rounded">
                Français
              </button>
              <button className="px-4 py-2 border border-blue-600 text-blue-600 rounded">
                العربية
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* News Ticker */}
      <NewsTicker />

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* News Section */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold mb-6">آخر الأخبار</h2>
            <div className="space-y-6">
              {/* Sample Article */}
              <article className="bg-white rounded-lg shadow p-6">
                <h3 className="text-xl font-bold mb-3">
                  عنوان الخبر الرئيسي يظهر هنا
                </h3>
                <p className="text-gray-600 mb-4">
                  ملخص الخبر أو الجزء الأول من المحتوى يظهر هنا...
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">مصدر الخبر</span>
                  <button className="text-blue-600 hover:text-blue-800">
                    اقرأ المزيد →
                  </button>
                </div>
              </article>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <WeatherWidget />
            <RadioPlayer />
          </div>
        </div>
      </div>
    </main>
  )
}
