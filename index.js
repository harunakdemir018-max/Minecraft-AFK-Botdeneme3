const mineflayer = require('mineflayer');

const botOptions = {
  host: 'oyna.wrus.net', // Örn: sunucun.aternos.me
  port: 25565,               // Sunucu portu
  username: 'txcpsy724',    // Botun oyundaki adı
  version: false             // Sürüm otomatik algılanır
};

function createBot() {
  const bot = mineflayer.createBot(botOptions);

  bot.on('spawn', () => {
    console.log('Bot sunucuya bağlandı!');

    // 1. ADIM: 3 saniye sonra İlk Şifre
    setTimeout(() => {
      bot.chat('1122334455harun'); 
    }, 3000);

    // 2. ADIM: 6 saniye sonra İkinci kez Şifre (Onay için)
    setTimeout(() => {
      bot.chat('1122334455harun'); 
    }, 6000);

    // 3. ADIM: 9 saniye sonra Gmail adresini yazma
    setTimeout(() => {
      bot.chat('harun123455789pp@gmail.com'); 
    }, 9000);

    // 4. ADIM: 12 saniye sonra 5. slotdaki pusulayı eline alıp sağ tık yapma
    setTimeout(async () => {
      try {
        const slotIndex = 4; // 5. slot (0'dan başlar)
        const item = bot.inventory.slots[slotIndex];
        
        if (item) {
          await bot.equip(item, 'hand');
          bot.activateItem();
          console.log('5. slottaki pusula kullanıldı, menü açılıyor...');
        } else {
          console.log('5. slot boş!');
        }
      } catch (err) {
        console.log('Pusula kullanılırken hata oluştu:', err);
      }
    }, 12000);

    // 5. ADIM: 15 saniye sonra açılan menüden 21. slotdaki Survival seçeneğine tıklama
    setTimeout(() => {
      try {
        const survivalSlot = 20; // 21. slot (0'dan başlar)
        
        if (bot.currentWindow) {
          bot.clickWindow(survivalSlot, 0, 0);
          console.log('21. slottaki Survival seçeneğine tıklandı!');
        } else {
          console.log('Menü açık değil, tıklanamadı!');
        }
      } catch (err) {
        console.log('Menüye tıklanırken hata oluştu:', err);
      }
    }, 15000);

    // 6. ADIM: 19 saniye sonra Survival'a geçtikten sonra AFK bölgesine gitme
    setTimeout(() => {
      bot.chat('/warp afk');
      console.log('/warp afk komutu gönderildi!');
    }, 19000);

  });

  // Botun oyundan atılmaması için her 60 saniyede bir zıplaması
  bot.on('spawn', () => {
    setInterval(() => {
      bot.setControlState('jump', true);
      setTimeout(() => {
        bot.setControlState('jump', false);
      }, 500);
    }, 60000);
  });

  // Bağlantı koparsa yeniden bağlanma
  bot.on('end', () => {
    console.log('Bağlantı koptu, yeniden bağlanılıyor...');
    setTimeout(createBot, 10000);
  });

  bot.on('error', err => console.log('Hata:', err));
}

createBot();
