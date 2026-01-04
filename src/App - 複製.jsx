import React, { useState, useRef, useEffect } from 'react';
import { 
  Sun, 
  Heart, 
  Sparkles, 
  RefreshCw, 
  BookOpen, 
  Check, 
  Feather,
  Info,
  ArrowRight,
  Bot,
  MessageCircle,
  X,
  Cloud,
  Star,
  Coffee,
  Smile,
  Music,
  Palette,
  Send,
  User,
  Loader2 
} from 'lucide-react';

// --- CONFIG: Backend URL ---
// ⚠️ 請確認這是否為您最新部署的 Web App URL (結尾必須是 /exec)
const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwi_I8ImQQW6zul-Y9kjsoF8KVf28acHiS6YAelkRec-cATSa0-SpGiWN5N-YbRDaubjQ/exec"; 

// --- DATA: Warm Phrases for Navbar (Rotation) ---
const WARM_PHRASES = [
  "給自己一份溫柔",
  "面對美好的自己",
  "相信自己是最棒的",
  "你的存在本身就是禮物",
  "擁抱當下的每一個情緒",
  "你值得被無條件地愛著",
  "慢慢來，一切都來得及",
  "聽見內心真實的聲音",
  "你比想像中更勇敢",
  "今天也要好好照顧自己"
];

// --- DATA: Complete Rainbow Card Database (245 Cards) ---
const FULL_DECK = [
  // RED (Root Chakra)
  { color: 'red', text: '我身體的每一個細胞都充滿了健康與活力。', textEn: 'Every cell in my body is full of health and vitality.', theme: '健康' },
  { color: 'red', text: '我有足夠的金錢與資源來支持我的生活。', textEn: 'I have enough money and resources to support my life.', theme: '富足' },
  { color: 'red', text: '我在這世界上是安全的，被大地支持著。', textEn: 'I am safe in this world and supported by the earth.', theme: '安全感' },
  { color: 'red', text: '我熱愛並接受我的身體原本的樣子。', textEn: 'I love and accept my body as it is.', theme: '身體接納' },
  { color: 'red', text: '我擁有強大的生命力。', textEn: 'I possess powerful life force.', theme: '活力' },
  { color: 'red', text: '我是豐盛的源頭。', textEn: 'I am the source of abundance.', theme: '豐盛' },
  { color: 'red', text: '我值得擁有美好的事物。', textEn: 'I deserve to have good things.', theme: '配得感' },
  { color: 'red', text: '我與大地之母有深深的連結。', textEn: 'I have a deep connection with Mother Earth.', theme: '連結大地' },
  { color: 'red', text: '我的身體是神聖的殿堂。', textEn: 'My body is a sacred temple.', theme: '神聖身體' },
  { color: 'red', text: '我放下對金錢的恐懼。', textEn: 'I let go of fear about money.', theme: '放下恐懼' },
  { color: 'red', text: '我信任生命會供應我所需的一切。', textEn: 'I trust that life will supply everything I need.', theme: '信任供應' },
  { color: 'red', text: '我在物質世界中感到自在。', textEn: 'I feel at home in the material world.', theme: '物質自在' },
  { color: 'red', text: '我是一個穩定且踏實的人。', textEn: 'I am a stable and grounded person.', theme: '踏實' },
  { color: 'red', text: '我感謝我的身體為我所做的一切。', textEn: 'I thank my body for everything it does for me.', theme: '感謝身體' },
  { color: 'red', text: '我每天都充滿活力地醒來。', textEn: 'I wake up every day full of vitality.', theme: '活力甦醒' },
  { color: 'red', text: '我允許自己休息和放鬆。', textEn: 'I allow myself to rest and relax.', theme: '休息' },
  { color: 'red', text: '我是安全的，一切都好。', textEn: 'I am safe, and all is well.', theme: '平安' },
  { color: 'red', text: '我對我的財務狀況負責。', textEn: 'I take responsibility for my financial situation.', theme: '財務責任' },
  { color: 'red', text: '我吸引財富來到我的生命中。', textEn: 'I attract wealth into my life.', theme: '吸引力' },
  { color: 'red', text: '我喜歡活動我的身體。', textEn: 'I enjoy moving my body.', theme: '運動' },
  { color: 'red', text: '我有權利擁有自己的空間。', textEn: 'I have the right to have my own space.', theme: '空間權' },
  { color: 'red', text: '我像大樹一樣紮根。', textEn: 'I am rooted like a big tree.', theme: '紮根' },
  { color: 'red', text: '我吃滋養我身體的食物。', textEn: 'I eat food that nourishes my body.', theme: '滋養' },
  { color: 'red', text: '我釋放身體裡累積的壓力。', textEn: 'I release accumulated stress in my body.', theme: '釋放壓力' },
  { color: 'red', text: '我活在當下，腳踏實地。', textEn: 'I live in the moment, with my feet on the ground.', theme: '活在當下' },
  { color: 'red', text: '我肯定我在這個世界上的存在。', textEn: 'I affirm my existence in this world.', theme: '存在感' },
  { color: 'red', text: '我有能力照顧我自己。', textEn: 'I have the ability to take care of myself.', theme: '自我照顧' },
  { color: 'red', text: '我對生命充滿熱情。', textEn: 'I am passionate about life.', theme: '熱情' },
  { color: 'red', text: '我享受物質生活的豐盛。', textEn: 'I enjoy the abundance of material life.', theme: '享受豐盛' },
  { color: 'red', text: '我的每一個呼吸都讓我更放鬆。', textEn: 'Every breath I take makes me more relaxed.', theme: '呼吸放鬆' },
  { color: 'red', text: '我與我的原生家庭和解。', textEn: 'I make peace with my family of origin.', theme: '家庭和解' },
  { color: 'red', text: '我擁有無限的潛能。', textEn: 'I possess infinite potential.', theme: '潛能' },
  { color: 'red', text: '我是一個有行動力的人。', textEn: 'I am a person of action.', theme: '行動力' },
  { color: 'red', text: '我能在變動中保持穩定。', textEn: 'I can maintain stability amidst change.', theme: '穩定' },
  { color: 'red', text: '我愛生命，生命也愛我。', textEn: 'I love life, and life loves me.', theme: '愛生命' },

  // ORANGE (Sacral Chakra)
  { color: 'orange', text: '我允許自己享受生命中的快樂與感官愉悅。', textEn: 'I allow myself to enjoy the pleasures and sensual delights of life.', theme: '享受' },
  { color: 'orange', text: '我釋放過去的情緒，擁抱當下的喜悅。', textEn: 'I release past emotions and embrace the joy of the now.', theme: '釋放情緒' },
  { color: 'orange', text: '我的內在小孩感到安全且被愛。', textEn: 'My inner child feels safe and loved.', theme: '內在小孩' },
  { color: 'orange', text: '我是一個充滿創造力的人。', textEn: 'I am a creative person.', theme: '創造力' },
  { color: 'orange', text: '我敞開心胸接受各種親密的可能性。', textEn: 'I open my heart to all possibilities of intimacy.', theme: '親密' },
  { color: 'orange', text: '我接納並愛惜我的性別與身體。', textEn: 'I accept and cherish my gender and body.', theme: '性別接納' },
  { color: 'orange', text: '情緒是流動的，我允許它們自然的來去。', textEn: 'Emotions are fluid; I allow them to come and go naturally.', theme: '情緒流動' },
  { color: 'orange', text: '我值得擁有快樂和愉悅的時光。', textEn: 'I deserve to have happy and pleasurable times.', theme: '快樂權利' },
  { color: 'orange', text: '我熱愛玩樂，並保持赤子之心。', textEn: 'I love to play and keep a childlike heart.', theme: '玩樂' },
  { color: 'orange', text: '我對我的感覺負責，不責怪他人。', textEn: 'I take responsibility for my feelings and do not blame others.', theme: '情感責任' },
  { color: 'orange', text: '我與他人的界線是健康的。', textEn: 'My boundaries with others are healthy.', theme: '界線' },
  { color: 'orange', text: '我尊重我的渴望與需求。', textEn: 'I respect my desires and needs.', theme: '尊重渴望' },
  { color: 'orange', text: '我像水一樣柔軟且有彈性。', textEn: 'I am soft and flexible like water.', theme: '彈性' },
  { color: 'orange', text: '我能自由地表達我的情感。', textEn: 'I can freely express my emotions.', theme: '表達情感' },
  { color: 'orange', text: '我吸引滋養我的人際關係。', textEn: 'I attract relationships that nourish me.', theme: '滋養關係' },
  { color: 'orange', text: '我享受創造的過程，而不只是結果。', textEn: 'I enjoy the creative process, not just the result.', theme: '享受過程' },
  { color: 'orange', text: '我感覺敏銳，並信任我的感覺。', textEn: 'I feel keenly and trust my feelings.', theme: '信任感覺' },
  { color: 'orange', text: '我願意去冒險和嘗試新事物。', textEn: 'I am willing to take risks and try new things.', theme: '冒險' },
  { color: 'orange', text: '生命是豐盛且充滿樂趣。', textEn: 'Life is abundant and full of fun.', theme: '生命樂趣' },
  { color: 'orange', text: '我原諒過去曾傷害我的人。', textEn: 'I forgive those who have hurt me in the past.', theme: '寬恕' },
  { color: 'orange', text: '我不需要取悅他人來證明自己的價值。', textEn: 'I do not need to please others to prove my worth.', theme: '不討好' },
  { color: 'orange', text: '我擁抱我的脆弱，那是我的力量。', textEn: 'I embrace my vulnerability; it is my strength.', theme: '脆弱' },
  { color: 'orange', text: '我與生命之流共舞。', textEn: 'I dance with the flow of life.', theme: '共舞' },
  { color: 'orange', text: '我是一個感性且性感的人。', textEn: 'I am a sensual and sexual person.', theme: '感性' },
  { color: 'orange', text: '我釋放對控制的需求。', textEn: 'I release the need for control.', theme: '放下控制' },
  { color: 'orange', text: '我慶祝我的獨特性。', textEn: 'I celebrate my uniqueness.', theme: '獨特' },
  { color: 'orange', text: '我允許自己感到快樂。', textEn: 'I allow myself to feel happy.', theme: '允許快樂' },
  { color: 'orange', text: '我是充滿熱情與活力的。', textEn: 'I am full of passion and vitality.', theme: '熱情' },
  { color: 'orange', text: '我喜歡我自己現在的樣子。', textEn: 'I like who I am right now.', theme: '喜歡自己' },
  { color: 'orange', text: '我能平衡工作與娛樂。', textEn: 'I can balance work and play.', theme: '平衡' },
  { color: 'orange', text: '我傾聽身體的訊息。', textEn: 'I listen to the messages of my body.', theme: '身體訊息' },
  { color: 'orange', text: '我值得被溫柔地對待。', textEn: 'I deserve to be treated gently.', theme: '溫柔' },
  { color: 'orange', text: '我的生命充滿了甜蜜。', textEn: 'My life is full of sweetness.', theme: '甜蜜' },
  { color: 'orange', text: '我是我自己情緒的主人。', textEn: 'I am the master of my own emotions.', theme: '情緒主人' },
  { color: 'orange', text: '我感謝生命中所有的體驗。', textEn: 'I thank life for all experiences.', theme: '感謝體驗' },

  // YELLOW (Solar Plexus Chakra)
  { color: 'yellow', text: '我尊重我自己，也尊重別人的界線。', textEn: 'I respect myself and I respect the boundaries of others.', theme: '尊重界線' },
  { color: 'yellow', text: '我有力量改變我的生活。', textEn: 'I have the power to change my life.', theme: '改變的力量' },
  { color: 'yellow', text: '我為自己做出的選擇負責。', textEn: 'I take responsibility for my choices.', theme: '選擇負責' },
  { color: 'yellow', text: '我肯定我自己的價值。', textEn: 'I affirm my own worth.', theme: '自我價值' },
  { color: 'yellow', text: '我能夠自信地表達我的需求。', textEn: 'I can express my needs with confidence.', theme: '自信表達' },
  { color: 'yellow', text: '我是一個有能力的人。', textEn: 'I am a capable person.', theme: '能力' },
  { color: 'yellow', text: '我信任我的判斷。', textEn: 'I trust my judgment.', theme: '判斷力' },
  { color: 'yellow', text: '我有勇氣做我自己。', textEn: 'I have the courage to be myself.', theme: '勇氣' },
  { color: 'yellow', text: '我接受我自己的力量。', textEn: 'I accept my own power.', theme: '接受力量' },
  { color: 'yellow', text: '我能克服生命中的挑戰。', textEn: 'I can overcome challenges in life.', theme: '克服挑戰' },
  { color: 'yellow', text: '我釋放對批評的恐懼。', textEn: 'I release the fear of criticism.', theme: '釋放批評' },
  { color: 'yellow', text: '我以正直的態度行事。', textEn: 'I act with integrity.', theme: '正直' },
  { color: 'yellow', text: '我值得擁有成功。', textEn: 'I deserve success.', theme: '成功' },
  { color: 'yellow', text: '我有權利說「不」。', textEn: 'I have the right to say "No".', theme: '拒絕的權利' },
  { color: 'yellow', text: '我是一個天生的領袖。', textEn: 'I am a natural leader.', theme: '領導力' },
  { color: 'yellow', text: '我掌控我自己的生命。', textEn: 'I am in control of my own life.', theme: '掌控' },
  { color: 'yellow', text: '我對我的目標充滿信心。', textEn: 'I am confident in my goals.', theme: '信心' },
  { color: 'yellow', text: '我欣賞我自己的成就。', textEn: 'I appreciate my own achievements.', theme: '自我欣賞' },
  { color: 'yellow', text: '我是獨一無二的個體。', textEn: 'I am a unique individual.', theme: '獨特性' },
  { color: 'yellow', text: '我擁有堅強的意志力。', textEn: 'I possess strong willpower.', theme: '意志力' },
  { color: 'yellow', text: '我能清楚地設立目標。', textEn: 'I can clearly set goals.', theme: '目標' },
  { color: 'yellow', text: '我是一個值得信賴的人。', textEn: 'I am a trustworthy person.', theme: '信賴' },
  { color: 'yellow', text: '我尊重我自己的意見。', textEn: 'I respect my own opinions.', theme: '尊重己見' },
  { color: 'yellow', text: '我釋放自卑感。', textEn: 'I release feelings of inferiority.', theme: '釋放自卑' },
  { color: 'yellow', text: '我有能力處理任何情況。', textEn: 'I am capable of handling any situation.', theme: '應變能力' },
  { color: 'yellow', text: '我為自己感到驕傲。', textEn: 'I am proud of myself.', theme: '驕傲' },
  { color: 'yellow', text: '我能自由地做決定。', textEn: 'I am free to make decisions.', theme: '自由決定' },
  { color: 'yellow', text: '我的存在是有意義的。', textEn: 'My existence is meaningful.', theme: '意義' },
  { color: 'yellow', text: '我散發著自信的光芒。', textEn: 'I radiate the light of confidence.', theme: '自信光芒' },
  { color: 'yellow', text: '我與我的內在力量連結。', textEn: 'I connect with my inner power.', theme: '內在力量' },
  { color: 'yellow', text: '我不受他人的評判影響。', textEn: 'I am not affected by the judgments of others.', theme: '不受評判' },
  { color: 'yellow', text: '我是一個勇敢的人。', textEn: 'I am a brave person.', theme: '勇敢' },
  { color: 'yellow', text: '我積極地採取行動。', textEn: 'I take action positively.', theme: '積極行動' },
  { color: 'yellow', text: '我愛我自己原本的樣子。', textEn: 'I love myself just as I am.', theme: '愛自己' },
  { color: 'yellow', text: '我是我自己生命的主宰。', textEn: 'I am the master of my own life.', theme: '主宰' },

  // GREEN (Heart Chakra)
  { color: 'green', text: '我值得被愛，我也願意給予愛。', textEn: 'I deserve to be loved and I am willing to give love.', theme: '愛與被愛' },
  { color: 'green', text: '我原諒我自己，也原諒傷害我的人。', textEn: 'I forgive myself and I forgive those who have hurt me.', theme: '寬恕' },
  { color: 'green', text: '我敞開心房，讓愛流動。', textEn: 'I open my heart and let love flow.', theme: '愛的流動' },
  { color: 'green', text: '我與周圍的人建立和諧的關係。', textEn: 'I create harmonious relationships with those around me.', theme: '和諧關係' },
  { color: 'green', text: '我深深地愛著並且接納我自己。', textEn: 'I deeply love and accept myself.', theme: '自我接納' },
  { color: 'green', text: '我呼吸著愛的能量。', textEn: 'I breathe in the energy of love.', theme: '愛的呼吸' },
  { color: 'green', text: '我對他人充滿慈悲與同理心。', textEn: 'I am filled with compassion and empathy for others.', theme: '慈悲' },
  { color: 'green', text: '愛是我生命中最大的療癒力量。', textEn: 'Love is the greatest healing power in my life.', theme: '愛的療癒' },
  { color: 'green', text: '我釋放所有的怨恨與憤怒。', textEn: 'I release all resentment and anger.', theme: '釋放怨恨' },
  { color: 'green', text: '我是被愛的，我並不孤單。', textEn: 'I am loved; I am not alone.', theme: '不孤單' },
  { color: 'green', text: '我願意信任愛。', textEn: 'I am willing to trust love.', theme: '信任愛' },
  { color: 'green', text: '我接納別人的本來面目。', textEn: 'I accept others as they are.', theme: '接納他人' },
  { color: 'green', text: '我的心是柔軟且開放的。', textEn: 'My heart is soft and open.', theme: '柔軟的心' },
  { color: 'green', text: '我在愛中感到安全。', textEn: 'I feel safe in love.', theme: '愛中安全' },
  { color: 'green', text: '我給予自己無條件的愛。', textEn: 'I give myself unconditional love.', theme: '無條件的愛' },
  { color: 'green', text: '我吸引愛我的人來到我的身邊。', textEn: 'I attract people who love me into my life.', theme: '吸引愛' },
  { color: 'green', text: '我與宇宙的愛合而為一。', textEn: 'I am one with the love of the universe.', theme: '合一' },
  { color: 'green', text: '我放下對愛的恐懼。', textEn: 'I let go of the fear of love.', theme: '放下恐懼' },
  { color: 'green', text: '我是一個充滿愛的人。', textEn: 'I am a loving person.', theme: '充滿愛' },
  { color: 'green', text: '我能在關係中保持獨立與連結。', textEn: 'I can maintain independence and connection in relationships.', theme: '關係平衡' },
  { color: 'green', text: '我感謝生命中所有的愛。', textEn: 'I am grateful for all the love in my life.', theme: '感謝愛' },
  { color: 'green', text: '我祝福我的敵人。', textEn: 'I bless my enemies.', theme: '祝福' },
  { color: 'green', text: '我讓過去的傷痛離去。', textEn: 'I let go of past hurts.', theme: '療癒傷痛' },
  { color: 'green', text: '愛總是圍繞著我。', textEn: 'Love always surrounds me.', theme: '愛圍繞' },
  { color: 'green', text: '我傾聽我心的智慧。', textEn: 'I listen to the wisdom of my heart.', theme: '心的智慧' },
  { color: 'green', text: '我能在施與受之間保持平衡。', textEn: 'I can maintain balance between giving and receiving.', theme: '施受平衡' },
  { color: 'green', text: '我是慷慨的。', textEn: 'I am generous.', theme: '慷慨' },
  { color: 'green', text: '我原諒我自己過去的錯誤。', textEn: 'I forgive myself for past mistakes.', theme: '自我寬恕' },
  { color: 'green', text: '我用愛的眼光看世界。', textEn: 'I look at the world with eyes of love.', theme: '愛的眼光' },
  { color: 'green', text: '我是值得被珍惜的。', textEn: 'I am worthy of being cherished.', theme: '被珍惜' },
  { color: 'green', text: '我與自然界保持和諧的關係。', textEn: 'I maintain a harmonious relationship with nature.', theme: '自然和諧' },
  { color: 'green', text: '我心裡充滿了平靜與喜悅。', textEn: 'My heart is filled with peace and joy.', theme: '平靜喜悅' },
  { color: 'green', text: '我是溫柔的。', textEn: 'I am gentle.', theme: '溫柔' },
  { color: 'green', text: '愛是我生命的核心。', textEn: 'Love is the core of my life.', theme: '愛的核心' },
  { color: 'green', text: '我選擇愛而非恐懼。', textEn: 'I choose love over fear.', theme: '選擇愛' },

  // BLUE
  { color: 'blue', text: '我對自己負責。', textEn: 'I take responsibility for myself.', theme: '負責' },
  { color: 'blue', text: '我為自己說話。', textEn: 'I speak for myself.', theme: '自我表達' },
  { color: 'blue', text: '我可以自由地表達我的感覺。', textEn: 'I am free to express my feelings.', theme: '自由表達' },
  { color: 'blue', text: '我誠實地表達我的感覺。', textEn: 'I express my feelings honestly.', theme: '誠實' },
  { color: 'blue', text: '我不管到哪裡，都感覺自在。', textEn: 'I feel at home wherever I am.', theme: '自在' },
  { color: 'blue', text: '我跟隨我的靈感。', textEn: 'I follow my inspiration.', theme: '靈感' },
  { color: 'blue', text: '我喜歡展現我自己。', textEn: 'I enjoy expressing myself.', theme: '展現自我' },
  { color: 'blue', text: '我創造我想要的生活。', textEn: 'I create the life I want.', theme: '創造生活' },
  { color: 'blue', text: '所有的問題都早已解決了。', textEn: 'All problems are already solved.', theme: '信任' },
  { color: 'blue', text: '我釋放掉所有的抗拒。', textEn: 'I release all resistance.', theme: '釋放' },
  { color: 'blue', text: '我很平靜。', textEn: 'I am at peace.', theme: '平靜' },
  { color: 'blue', text: '我生活在當下。', textEn: 'I live in the present moment.', theme: '當下' },
  { color: 'blue', text: '我值得擁有快樂。', textEn: 'I deserve to be happy.', theme: '配得感' },
  { color: 'blue', text: '我每天都挪出時間讓自己安靜片刻。', textEn: 'I take time to be quiet every day.', theme: '寧靜' },
  { color: 'blue', text: '藉由分享我的想法，我帶給別人喜悅。', textEn: 'By sharing my thoughts, I bring joy to others.', theme: '分享' },
  { color: 'blue', text: '我擁有我很喜歡的正面特質。', textEn: 'I possess positive qualities that I like.', theme: '自我肯定' },
  { color: 'blue', text: '我越平靜，我就越有力量。', textEn: 'The more peaceful I am, the more powerful I am.', theme: '平靜的力量' },
  { color: 'blue', text: '我總是能與大我連結。', textEn: 'I am always connected with my Higher Self.', theme: '連結' },
  { color: 'blue', text: '我很輕易地順著生命的流流動。', textEn: 'I flow easily with the stream of life.', theme: '順流' },
  { color: 'blue', text: '我願意改變。', textEn: 'I am willing to change.', theme: '改變' },
  { color: 'blue', text: '我把生命中的挑戰視為成長的機會。', textEn: 'I see challenges in life as opportunities for growth.', theme: '成長' },
  { color: 'blue', text: '我有權力也有能力去表達我的憤怒。', textEn: 'I have the right and the power to express my anger.', theme: '情緒權利' },
  { color: 'blue', text: '我對我的生命說是。', textEn: 'I say YES to life.', theme: '接納' },
  { color: 'blue', text: '我一直都走在正確的道路上。', textEn: 'I am always on the right path.', theme: '信任道路' },
  { color: 'blue', text: '我的聲音是重要的。', textEn: 'My voice is important.', theme: '自我價值' },
  { color: 'blue', text: '我願意傾聽別人的心聲。', textEn: 'I am willing to listen to the hearts of others.', theme: '傾聽' },
  { color: 'blue', text: '我以愛與真理來溝通。', textEn: 'I communicate with love and truth.', theme: '溝通' },
  { color: 'blue', text: '我誠實地面對我自己。', textEn: 'I am honest with myself.', theme: '誠實' },
  { color: 'blue', text: '我很容易就能放鬆。', textEn: 'It is easy for me to relax.', theme: '放鬆' },
  { color: 'blue', text: '我活出真實的自己。', textEn: 'I live my authentic self.', theme: '真實' },
  { color: 'blue', text: '我信任我的內在聲音。', textEn: 'I trust my inner voice.', theme: '直覺' },
  { color: 'blue', text: '我清晰地思考與表達。', textEn: 'I think and express clearly.', theme: '清晰' },
  { color: 'blue', text: '我與宇宙的頻率共振。', textEn: 'I resonate with the frequency of the universe.', theme: '共振' },
  { color: 'blue', text: '和平從我開始。', textEn: 'Peace begins with me.', theme: '和平' },
  { color: 'blue', text: '我是冷靜且清晰的。', textEn: 'I am calm and clear.', theme: '冷靜' },

  // INDIGO
  { color: 'indigo', text: '我信任我的直覺，它引領我走在正確的道路上。', textEn: 'I trust my intuition; it leads me on the right path.', theme: '信任直覺' },
  { color: 'indigo', text: '我放下不再服務於我的舊信念。', textEn: 'I let go of old beliefs that no longer serve me.', theme: '放下舊念' },
  { color: 'indigo', text: '我擁有清晰的洞察力。', textEn: 'I possess clear insight.', theme: '洞察力' },
  { color: 'indigo', text: '我對自己的生命負起完全的責任。', textEn: 'I take full responsibility for my life.', theme: '完全負責' },
  { color: 'indigo', text: '我看見事情背後的真相。', textEn: 'I see the truth behind things.', theme: '真相' },
  { color: 'indigo', text: '我是一個有智慧的人。', textEn: 'I am a wise person.', theme: '智慧' },
  { color: 'indigo', text: '我能清楚地看見我的願景。', textEn: 'I can clearly see my vision.', theme: '願景' },
  { color: 'indigo', text: '我與內在的智慧連結。', textEn: 'I connect with my inner wisdom.', theme: '內在智慧' },
  { color: 'indigo', text: '我是一個視覺化能力很強的人。', textEn: 'I am a person with strong visualization skills.', theme: '視覺化' },
  { color: 'indigo', text: '我信任宇宙的指引。', textEn: 'I trust the guidance of the universe.', theme: '宇宙指引' },
  { color: 'indigo', text: '我敞開心胸接受新的想法。', textEn: 'I open my mind to new ideas.', theme: '新想法' },
  { color: 'indigo', text: '我的想像力是無限的。', textEn: 'My imagination is infinite.', theme: '想像力' },
  { color: 'indigo', text: '我能看見事物的全貌。', textEn: 'I can see the big picture.', theme: '全貌' },
  { color: 'indigo', text: '我是一個靈性的存有。', textEn: 'I am a spiritual being.', theme: '靈性' },
  { color: 'indigo', text: '我釋放對未知的恐懼。', textEn: 'I release fear of the unknown.', theme: '釋放恐懼' },
  { color: 'indigo', text: '我原諒我自己和我所有的過去。', textEn: 'I forgive myself and all my past.', theme: '徹底寬恕' },
  { color: 'indigo', text: '我知道什麼對我是最好的。', textEn: 'I know what is best for me.', theme: '自我知曉' },
  { color: 'indigo', text: '我是一個有遠見的人。', textEn: 'I am a visionary.', theme: '遠見' },
  { color: 'indigo', text: '我能聽見內在的聲音。', textEn: 'I can hear my inner voice.', theme: '內在聲音' },
  { color: 'indigo', text: '我與我的高我不斷溝通。', textEn: 'I am in constant communication with my Higher Self.', theme: '高我溝通' },
  { color: 'indigo', text: '我相信奇蹟。', textEn: 'I believe in miracles.', theme: '奇蹟' },
  { color: 'indigo', text: '我是一個強大的顯化者。', textEn: 'I am a powerful manifestor.', theme: '顯化' },
  { color: 'indigo', text: '我能看穿幻象，看見本質。', textEn: 'I can see through illusions to the essence.', theme: '看穿幻象' },
  { color: 'indigo', text: '我的心智是平靜且清晰的。', textEn: 'My mind is calm and clear.', theme: '心智清晰' },
  { color: 'indigo', text: '我對生命充滿了好奇心。', textEn: 'I am full of curiosity about life.', theme: '好奇心' },
  { color: 'indigo', text: '我總是能做出正確的決定。', textEn: 'I always make the right decisions.', theme: '正確決定' },
  { color: 'indigo', text: '我是一個觀察者，我不批判。', textEn: 'I am an observer; I do not judge.', theme: '觀察者' },
  { color: 'indigo', text: '我擁有無限的創造潛能。', textEn: 'I possess infinite creative potential.', theme: '創造潛能' },
  { color: 'indigo', text: '我信任我的夢境帶來的訊息。', textEn: 'I trust the messages from my dreams.', theme: '夢境' },
  { color: 'indigo', text: '我是一個光的工作者。', textEn: 'I am a lightworker.', theme: '光' },
  { color: 'indigo', text: '我能整合我的邏輯與直覺。', textEn: 'I can integrate my logic and intuition.', theme: '整合' },
  { color: 'indigo', text: '我總是處於正確的時間與地點。', textEn: 'I am always in the right place at the right time.', theme: '共時性' },
  { color: 'indigo', text: '我是一個具有啟發性的人。', textEn: 'I am an inspiring person.', theme: '啟發' },
  { color: 'indigo', text: '我看見每個人的神性。', textEn: 'I see the divinity in everyone.', theme: '神性' },
  { color: 'indigo', text: '我與宇宙智慧是連結的。', textEn: 'I am connected to universal wisdom.', theme: '宇宙智慧' },

  // VIOLET
  { color: 'violet', text: '我與宇宙的愛與智慧連結。', textEn: 'I connect with the love and wisdom of the universe.', theme: '連結宇宙' },
  { color: 'violet', text: '我信任生命的安排，一切都是最好的發生。', textEn: 'I trust life\'s plan; everything happens for the best.', theme: '信任安排' },
  { color: 'violet', text: '我活出我生命的使命與目的。', textEn: 'I live out my life\'s mission and purpose.', theme: '生命使命' },
  { color: 'violet', text: '我是圓滿俱足的。', textEn: 'I am whole and complete.', theme: '圓滿' },
  { color: 'violet', text: '我被神聖的光與愛保護著。', textEn: 'I am protected by divine light and love.', theme: '神聖保護' },
  { color: 'violet', text: '我是宇宙神聖計畫的一部分。', textEn: 'I am part of the divine plan of the universe.', theme: '神聖計畫' },
  { color: 'violet', text: '我是一個靈性的存在，擁有凡人的體驗。', textEn: 'I am a spiritual being having a human experience.', theme: '靈性體驗' },
  { color: 'violet', text: '我釋放所有的小我與執著。', textEn: 'I release all ego and attachment.', theme: '放下執著' },
  { color: 'violet', text: '我生活在無條件的愛中。', textEn: 'I live in unconditional love.', theme: '無條件之愛' },
  { color: 'violet', text: '我是永恆不朽的靈魂。', textEn: 'I am an immortal soul.', theme: '永恆靈魂' },
  { color: 'violet', text: '我與萬物合而為一。', textEn: 'I am one with all things.', theme: '合一' },
  { color: 'violet', text: '我是一個和平的通道。', textEn: 'I am a channel for peace.', theme: '和平通道' },
  { color: 'violet', text: '我對生命充滿了感激。', textEn: 'I am filled with gratitude for life.', theme: '感激' },
  { color: 'violet', text: '我將我的生命交託給更高的力量。', textEn: 'I surrender my life to a higher power.', theme: '交託' },
  { color: 'violet', text: '我是一個受祝福的人。', textEn: 'I am a blessed person.', theme: '受祝福' },
  { color: 'violet', text: '我生活在恩典之中。', textEn: 'I live in grace.', theme: '恩典' },
  { color: 'violet', text: '我是一個覺醒的人。', textEn: 'I am an awakened person.', theme: '覺醒' },
  { color: 'violet', text: '我散發著神聖的光芒。', textEn: 'I radiate divine light.', theme: '神聖光芒' },
  { color: 'violet', text: '我是一個充滿喜悅的人。', textEn: 'I am a joyful person.', theme: '喜悅' },
  { color: 'violet', text: '我值得擁有生命中所有的美好。', textEn: 'I deserve all the good in life.', theme: '值得美好' },
  { color: 'violet', text: '我是一個自由的靈魂。', textEn: 'I am a free soul.', theme: '自由' },
  { color: 'violet', text: '我與神性智慧連結。', textEn: 'I am connected to divine wisdom.', theme: '神性智慧' },
  { color: 'violet', text: '我是一個慈悲的存有。', textEn: 'I am a compassionate being.', theme: '慈悲' },
  { color: 'violet', text: '我尊重所有生命的展現。', textEn: 'I respect all expressions of life.', theme: '尊重生命' },
  { color: 'violet', text: '我是完美的，就像造物主創造我一樣。', textEn: 'I am perfect, just as the Creator made me.', theme: '完美' },
  { color: 'violet', text: '我處於當下時刻的永恆之中。', textEn: 'I am in the eternity of the present moment.', theme: '永恆當下' },
  { color: 'violet', text: '我是一個充滿奇蹟的人。', textEn: 'I am a person full of miracles.', theme: '奇蹟' },
  { color: 'violet', text: '我與源頭連結。', textEn: 'I am connected to the Source.', theme: '連結源頭' },
  { color: 'violet', text: '我是無限的。', textEn: 'I am infinite.', theme: '無限' },
  { color: 'violet', text: '我是一個充滿愛與光的人。', textEn: 'I am a person full of love and light.', theme: '愛與光' },
  { color: 'violet', text: '我服務於人類與地球。', textEn: 'I serve humanity and the Earth.', theme: '服務' },
  { color: 'violet', text: '我是一個療癒者。', textEn: 'I am a healer.', theme: '療癒者' },
  { color: 'violet', text: '我是一個充滿智慧的靈魂。', textEn: 'I am a soul full of wisdom.', theme: '智慧靈魂' },
  { color: 'violet', text: '我生活在和諧之中。', textEn: 'I live in harmony.', theme: '和諧' },
  { color: 'violet', text: '我是被祝福的，我也祝福他人。', textEn: 'I am blessed, and I bless others.', theme: '祝福他人' },
];

// --- CONSTANTS: Color Mappings ---
const COLOR_MAP = {
  red: { 
    name: '紅色', 
    bg: 'bg-red-500', 
    light: 'bg-red-50', 
    border: 'border-red-200', 
    text: 'text-red-700',
    meaning: '安全感、金錢、身體、生活穩定度',
    action: '試著赤腳踩在草地或土地上，感受大地之母的支持；或者整理一下錢包，對每一筆金錢表達感謝。',
    keyword: '紮根與生存',
    desc: '紅色代表海底輪，是生命的根基。它關乎我們的生存本能、安全感以及與物質世界的連結。'
  },
  orange: { 
    name: '橘色', 
    bg: 'bg-orange-500', 
    light: 'bg-orange-50', 
    border: 'border-orange-200', 
    text: 'text-orange-700',
    meaning: '玩樂、創造力、內在小孩、享受生命',
    action: '做一件單純為了好玩而做的事，吃一頓美味的餐點，或者隨意地跳一支舞，讓身體動起來。',
    keyword: '情感與創造',
    desc: '橘色代表臍輪，掌管我們的情緒、創造力與感官享受。它是內在小孩的居所，也是喜悅的源泉。'
  },
  yellow: { 
    name: '黃色', 
    bg: 'bg-yellow-400', 
    light: 'bg-yellow-50', 
    border: 'border-yellow-200', 
    text: 'text-yellow-700',
    meaning: '自我價值、自信、界線、選擇與決定',
    action: '練習對不想做的事情說「不」，或者在鏡子前對自己說三次：「我有力量創造我想要的生活。」',
    keyword: '力量與自信',
    desc: '黃色代表太陽神經叢，是個人的力量中心。它影響著我們的意志力、自信心以及自我價值感。'
  },
  green: { 
    name: '綠色', 
    bg: 'bg-green-500', 
    light: 'bg-green-50', 
    border: 'border-green-200', 
    text: 'text-green-700',
    meaning: '愛與關係、親密、寬恕、自我接納',
    action: '做幾次深呼吸，想像綠色的光充滿心輪；或者給你愛的人（或自己）一個大大的擁抱。',
    keyword: '愛與慈悲',
    desc: '綠色代表心輪，是愛與慈悲的中心。它連結了物質與靈性，教導我們如何去愛、寬恕與接納。'
  },
  blue: { 
    name: '藍色', 
    bg: 'bg-sky-400', 
    light: 'bg-sky-50', 
    border: 'border-sky-200', 
    text: 'text-sky-700',
    meaning: '溝通表達、說話方式、專注與活在當下',
    action: '唱一首歌，寫一篇自由書寫的日記，或者單純地安靜五分鐘，觀察自己的呼吸。',
    keyword: '表達與真實',
    desc: '藍色代表喉輪，掌管溝通與自我表達。它鼓勵我們說出內在的真理，並真實地活出自己。'
  },
  indigo: { 
    name: '靛色', 
    bg: 'bg-indigo-600', 
    light: 'bg-indigo-50', 
    border: 'border-indigo-200', 
    text: 'text-indigo-700',
    meaning: '思考模式、內在對話、信念、看事情的眼光',
    action: '記錄下昨晚的夢境，或者閉上眼睛，想像眉心輪有一道靛藍色的光，信任你的第一個直覺。',
    keyword: '洞見與直覺',
    desc: '靛色代表眉心輪（第三眼），與直覺、洞察力及想像力有關。它幫助我們看清事物的本質。'
  },
  violet: { 
    name: '紫色', 
    bg: 'bg-purple-500', 
    light: 'bg-purple-50', 
    border: 'border-purple-200', 
    text: 'text-purple-700',
    meaning: '直覺、信任、生命使命、與更大的力量連結',
    action: '進行一段簡短的冥想，感受頭頂與宇宙的連結，並在心中默唸：「我信任生命的安排。」',
    keyword: '靈性與合一',
    desc: '紫色代表頂輪，是我們與宇宙神性智慧連結的通道。它帶來靈性的覺醒、合一與深層的平靜。'
  },
};

// --- HELPER: API Logic (Communicates with GAS) ---
const callAiApi = async (question, cardsContext, isChat = false) => {
  if (!GOOGLE_SCRIPT_URL) {
    return "錯誤：未設定 Google Apps Script URL。";
  }

  try {
    const payload = {
      question: question,
      cards: cardsContext,
      isChat: isChat
    };

    console.log("Sending to AI:", payload);

    const response = await fetch(GOOGLE_SCRIPT_URL, {
      method: "POST",
      // IMPORTANT: Use text/plain to avoid CORS preflight options request
      body: JSON.stringify(payload),
      headers: { "Content-Type": "text/plain;charset=utf-8" },
    });

    if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status}`);
    }

    const data = await response.json();
    if (data.result) return data.result;
    if (data.error) return `AI 服務回傳錯誤：${data.error}`;
    
    return "錯誤：無法從 AI 取得有效回應 (Empty result)。";

  } catch (error) {
    console.error("API Fetch Error:", error);
    return `連線錯誤：無法連接到 Google Apps Script。\n可能原因：\n1. 跨網域 (CORS) 問題\n2. 網路連線中斷\n3. Apps Script 部署設定錯誤 (請確認已設定為 'Anyone')\n詳細錯誤：${error.message}`;
  }
};

const getAiInterpretation = async (cardCount, cards, question) => {
  // Format cards data for the AI
  const cardContext = cards.map((c, i) => `第 ${i+1} 張卡：〈${c.text}〉｜顏色：${COLOR_MAP[c.color].name}`).join("\n");
  
  // Send simple structured data, let GAS handle the prompting
  return await callAiApi(question, cardContext, false);
};

// --- COMPONENTS ---

const Card = ({ color, text, textEn, isFlipped, onClick, size = 'normal', isZoomed = false }) => {
  const colorData = COLOR_MAP[color] || COLOR_MAP.red;
  
  // Dynamic styles based on size and zoom state
  const containerClass = isZoomed
    ? 'w-full max-w-sm aspect-[2/3] max-h-[80vh]' 
    : size === 'small' 
      ? 'w-24 h-36 md:hover:scale-[1.2] md:hover:z-10 transition-transform duration-300 origin-center'
      : 'w-64 h-96';

  return (
    <div 
      className={`
        relative transform-gpu preserve-3d
        ${containerClass}
        ${isFlipped ? 'rotate-y-0' : 'rotate-y-180'}
        flex-shrink-0
        ${!isZoomed && 'transition-all duration-700'} 
      `}
      onClick={onClick}
      style={{ perspective: '1000px', transformStyle: 'preserve-3d' }}
    >
      <div className={`
        absolute w-full h-full backface-hidden rounded-xl shadow-xl 
        flex flex-col items-center justify-center text-center
        ${colorData.bg} text-white font-medium tracking-wide leading-relaxed
        overflow-y-auto hide-scrollbar
        ${size === 'small' && !isZoomed ? 'p-2' : 'p-8'}
      `}>
        <div className={`absolute top-4 left-4 opacity-50 ${size === 'small' && !isZoomed ? 'scale-50 top-2 left-2' : ''}`}><Sparkles size={20} /></div>
        <div className={`absolute bottom-4 right-4 opacity-50 ${size === 'small' && !isZoomed ? 'scale-50 bottom-2 right-2' : ''}`}><Heart size={20} /></div>
        
        <p className={`drop-shadow-md mb-4 font-bold ${
          isZoomed ? 'text-2xl leading-relaxed' : 
          size === 'small' ? 'text-[10px] leading-tight mb-1' : 'text-xl leading-relaxed'
        }`}>
          {text}
        </p>
        
        {textEn && (
          <p className={`drop-shadow-sm font-serif italic opacity-90 ${
            isZoomed ? 'text-lg mt-2' :
            size === 'small' ? 'text-[7px] leading-tight' : 'text-sm font-light'
          }`}>
            {textEn}
          </p>
        )}

        <p className={`absolute ${
          size === 'small' && !isZoomed ? 'bottom-2 text-[6px]' : 'bottom-6 text-xs'
        } opacity-60 font-light tracking-widest uppercase`}>
          Rainbow Card
        </p>
      </div>

      <div className={`
        absolute w-full h-full backface-hidden rounded-xl shadow-lg 
        bg-white border-4 border-white
        flex items-center justify-center
        rotate-y-180
      `}
      style={{
        backgroundImage: 'radial-gradient(circle at 50% 50%, #fef3c7 10%, #fff1f2 100%)'
      }}>
        <div className="w-full h-full rounded-lg border-2 border-dashed border-rose-200 flex items-center justify-center">
          <div className="text-rose-300 flex flex-col items-center gap-2">
            <Sun size={size === 'small' ? 24 : 48} />
            <span className={`font-serif tracking-widest text-rose-400 ${size === 'small' ? 'text-[8px]' : 'text-sm'}`}>RAINBOW</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const ColorBadge = ({ color }) => {
  const c = COLOR_MAP[color];
  return (
    <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${c.light} ${c.text} border ${c.border}`}>
      <div className={`w-2 h-2 rounded-full ${c.bg}`}></div>
      {c.name}
    </span>
  );
};

// --- Chat Interface Component ---
const ChatInterface = ({ drawnCards }) => {
  const [messages, setMessages] = useState([
    { role: 'assistant', content: '您好，我是您的心靈對話夥伴。針對這次的抽卡，還有什麼想深入探討的嗎？' }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg = { role: 'user', content: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    const cardContext = drawnCards.map(c => `[卡片:${c.text}(${c.color})]`).join("");
    // Call API with isChat=true
    const responseText = await callAiApi(userMsg.content, cardContext, true);
    
    setMessages(prev => [...prev, { role: 'assistant', content: responseText }]);
    setIsTyping(false);
  };

  return (
    <div className="bg-white border-2 border-orange-300 rounded-2xl overflow-hidden shadow-xl flex flex-col h-[500px]">
      {/* Header - Vivid Orange/Pink Gradient */}
      <div className="bg-gradient-to-r from-orange-400 to-pink-500 p-4 flex items-center gap-3 shadow-md">
        <div className="bg-white/20 p-2 rounded-full backdrop-blur-sm">
          <Bot size={20} className="text-white" />
        </div>
        <span className="font-bold text-white text-lg tracking-wide text-shadow-sm">心靈對話室</span>
      </div>
      
      {/* Messages Area - Warm Background */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-orange-50/50">
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`
              max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed shadow-sm whitespace-pre-wrap
              ${msg.role === 'user' 
                ? 'bg-orange-500 text-white rounded-tr-none' 
                : 'bg-white text-gray-700 border border-orange-100 rounded-tl-none'}
            `}>
              {msg.content}
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-white border border-orange-100 rounded-2xl rounded-tl-none px-4 py-3 shadow-sm">
              <div className="flex gap-1">
                <div className="w-2 h-2 bg-orange-300 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-orange-300 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                <div className="w-2 h-2 bg-orange-300 rounded-full animate-bounce" style={{animationDelay: '0.4s'}}></div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 bg-white border-t border-orange-100 flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          placeholder="輸入您的想法或疑問..."
          className="flex-1 bg-orange-50 border border-orange-200 rounded-full px-5 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-300 transition-all placeholder:text-orange-300 text-gray-700"
        />
        <button 
          onClick={handleSend}
          disabled={!input.trim() || isTyping}
          className="bg-pink-500 text-white p-3 rounded-full hover:bg-pink-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-sm flex-shrink-0"
        >
          <Send size={20} />
        </button>
      </div>
    </div>
  );
};

// --- Background Decorations Component ---
const BackgroundDecorations = () => (
  <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
    <div className="absolute top-[10%] left-[5%] text-yellow-200/40 animate-float-delay"><Star size={48} /></div>
    <div className="absolute top-[20%] right-[10%] text-orange-200/30 animate-float"><Cloud size={64} /></div>
    <div className="absolute bottom-[15%] left-[15%] text-rose-200/30 animate-float-delay"><Heart size={56} /></div>
    <div className="absolute bottom-[25%] right-[5%] text-blue-200/30 animate-float"><Music size={40} /></div>
    {/* Gradient blobs */}
    <div className="absolute top-[-10%] right-[-5%] w-96 h-96 bg-yellow-100/30 rounded-full blur-3xl"></div>
    <div className="absolute bottom-[-10%] left-[-5%] w-96 h-96 bg-orange-100/30 rounded-full blur-3xl"></div>
  </div>
);

export default function App() {
  const [view, setView] = useState('home'); 
  const [question, setQuestion] = useState('');
  const [cardCount, setCardCount] = useState(1); 
  const [drawnCards, setDrawnCards] = useState([]);
  const [isFlipping, setIsFlipping] = useState(false);
  const [manualInputs, setManualInputs] = useState(Array(5).fill({ color: 'red', text: '' }));
  
  // AI Interpretation State (JSX or String)
  const [aiInterpretation, setAiInterpretation] = useState(null);
  const [isAiLoading, setIsAiLoading] = useState(false);

  // Rotating Title State
  const [titleIndex, setTitleIndex] = useState(0);

  // Zoomed Card State
  const [zoomedCard, setZoomedCard] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [view]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTitleIndex((prev) => (prev + 1) % WARM_PHRASES.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Generate Simulated AI Response
  useEffect(() => {
    if (view === 'result' && drawnCards.length > 0) {
      setIsAiLoading(true);
      setAiInterpretation(null);
      
      const fetchAiResponse = async () => {
        // Direct call to API, get string (interpretation or error)
        const result = await getAiInterpretation(cardCount, drawnCards, question);
        
        // Wrap text in a nice container for display
        setAiInterpretation(
             <div className="animate-fade-in relative z-10 whitespace-pre-wrap leading-relaxed text-gray-700 bg-white/60 p-6 rounded-xl border border-purple-100 shadow-sm">
                {result}
             </div>
        );

        setIsAiLoading(false);
      };

      fetchAiResponse();
    }
  }, [view, drawnCards, question]);

  // --- ACTIONS ---

  const handleDraw = () => {
    setIsFlipping(true);
    const newCards = [];
    const deck = [...FULL_DECK]; 
    
    for (let i = 0; i < cardCount; i++) {
      const randomIndex = Math.floor(Math.random() * deck.length);
      newCards.push({ ...deck[randomIndex], id: Date.now() + i });
    }
    
    setTimeout(() => {
      setDrawnCards(newCards);
      setIsFlipping(false);
      setView('result');
    }, 1500); 
  };

  const handleManualSubmit = () => {
    const validInputs = manualInputs.slice(0, cardCount).map(input => ({
      ...input,
      theme: COLOR_MAP[input.color].meaning, 
      id: Date.now() + Math.random()
    }));
    
    if (validInputs.some(c => !c.text.trim())) {
      alert("請輸入卡片上的文字喔！");
      return;
    }

    setDrawnCards(validInputs);
    setView('result');
  };

  // --- VIEWS ---

  const renderHome = () => (
    <div className="flex flex-col items-center justify-center min-h-[80vh] text-center space-y-12 animate-fade-in py-12 relative z-10">
      <div className="relative">
        <div className="absolute -inset-8 bg-orange-200 rounded-full opacity-30 blur-2xl animate-pulse"></div>
        <div className="bg-white/80 backdrop-blur-sm p-8 rounded-[2rem] shadow-xl relative border border-white/50">
          <Sun size={64} className="text-orange-400 mx-auto mb-4 drop-shadow-sm" />
          <h1 className="text-5xl font-bold text-gray-800 tracking-tight mb-2">彩虹卡療癒所</h1>
          <p className="text-gray-500 text-sm tracking-[0.2em] uppercase">Rainbow Card Sanctuary</p>
        </div>
      </div>

      <div className="max-w-md text-gray-600 leading-relaxed px-4 text-lg font-light">
        <p>每一張彩虹卡，都是來自當下的溫柔提醒。</p>
        <p>在這裡，沒有好壞對錯，只有照見內心的光。</p>
      </div>

      {/* Floating Card Buttons */}
      <div className="flex flex-col md:flex-row gap-8 items-center justify-center w-full max-w-4xl px-4 mt-8">
        
        {/* Button 1: Online Draw */}
        <button 
          onClick={() => setView('draw_setup')}
          className="group relative w-64 h-80 rounded-2xl shadow-2xl transition-all duration-500 animate-float hover:scale-105"
          style={{ perspective: '1000px' }}
        >
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-orange-400 to-rose-400 p-[2px]">
            <div className="h-full w-full bg-gradient-to-br from-orange-400/90 to-rose-400/90 rounded-2xl backdrop-blur-sm flex flex-col items-center justify-center text-white p-6 relative overflow-hidden">
               <div className="absolute top-[-20%] right-[-20%] w-32 h-32 bg-white/20 rounded-full blur-xl"></div>
               <div className="absolute bottom-[-10%] left-[-10%] w-24 h-24 bg-yellow-300/20 rounded-full blur-xl"></div>
               
               <div className="bg-white/20 p-4 rounded-full mb-6 group-hover:scale-110 transition-transform duration-500 shadow-lg border border-white/30">
                 <Sparkles size={32} />
               </div>
               <span className="text-2xl font-bold tracking-wider mb-2 drop-shadow-md">線上抽卡</span>
               <span className="text-sm opacity-90 font-light tracking-widest text-orange-50">Virtual Deck</span>
               <div className="mt-6 text-xs bg-white/20 px-4 py-1.5 rounded-full backdrop-blur-md">讓宇宙為你選牌</div>
            </div>
          </div>
        </button>

        {/* Button 2: Manual Draw */}
        <button 
          onClick={() => setView('manual_setup')}
          className="group relative w-64 h-80 rounded-2xl shadow-2xl transition-all duration-500 animate-float-delay hover:scale-105"
          style={{ perspective: '1000px' }}
        >
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-orange-200 to-amber-200 p-[2px]">
             <div className="h-full w-full bg-gradient-to-br from-orange-50 to-amber-50 rounded-2xl flex flex-col items-center justify-center text-gray-700 p-6 relative overflow-hidden">
               <div className="absolute top-[-20%] left-[-20%] w-32 h-32 bg-orange-200/30 rounded-full blur-xl"></div>
               
               <div className="bg-white p-4 rounded-full mb-6 group-hover:scale-110 transition-transform duration-500 shadow-lg border border-orange-100 text-orange-400">
                 <BookOpen size={32} />
               </div>
               <span className="text-2xl font-bold tracking-wider mb-2 text-gray-800">實體卡解讀</span>
               <span className="text-sm opacity-60 font-light tracking-widest text-gray-500">Physical Deck</span>
               <div className="mt-6 text-xs bg-orange-200/30 px-4 py-1.5 rounded-full text-orange-800 font-medium">輸入你的卡片</div>
             </div>
          </div>
        </button>

      </div>

      {/* About Section - ENRICHED */}
      <div className="mt-16 w-full max-w-4xl px-4">
        <div className="bg-white/60 backdrop-blur-md rounded-3xl p-8 border border-white/60 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 p-12 bg-gradient-to-bl from-orange-100/50 to-transparent rounded-bl-full"></div>
          
          <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2 relative z-10">
            <Palette className="text-orange-400" />
            關於彩虹卡的色彩能量
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
            <div className="space-y-4">
              <p className="text-gray-600 leading-relaxed text-sm">
                彩虹卡（Rainbow Cards）由藝術治療師 Doris Wenzel 設計，共有 245 張充滿智慧的肯定語句。
                這套卡片依循脈輪系統（Chakras）的七種顏色，每種顏色對應著我們生命中不同的能量中心與課題。
              </p>
              <div className="p-4 bg-orange-50 rounded-xl text-orange-800 text-sm font-medium">
                抽卡不是為了預測未來，而是為了「覺察當下」。它像是一面鏡子，映照出你此刻內心的狀態與渴望。
              </div>
            </div>
            
            <div className="grid grid-cols-1 gap-2 text-xs">
              {Object.values(COLOR_MAP).map((c) => (
                <div key={c.name} className="flex items-start gap-2 p-2 rounded-lg hover:bg-white/50 transition-colors">
                  <div className={`w-3 h-3 rounded-full mt-1 shrink-0 ${c.bg}`}></div>
                  <div>
                    <span className={`font-bold ${c.text} mr-1`}>{c.name}</span>
                    <span className="text-gray-600">{c.desc}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderSetup = (mode) => (
    <div className="max-w-2xl mx-auto w-full animate-fade-in space-y-8 relative z-10">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold text-gray-800 flex items-center justify-center gap-2">
          {mode === 'draw' ? <Sparkles className="text-purple-400" /> : <BookOpen className="text-orange-400" />}
          {mode === 'draw' ? '準備抽卡' : '輸入卡片資訊'}
        </h2>
        <p className="text-gray-500">
          {mode === 'draw' ? '請先靜下心，專注於你想詢問的主題。' : '請看著你手中的卡片，將文字與顏色記錄下來。'}
        </p>
      </div>

      {/* Question Input - CHANGED to Rose Pink */}
      <div className="bg-rose-100 p-6 rounded-2xl shadow-md border-2 border-rose-300 space-y-4 transform hover:scale-[1.01] transition-transform duration-300">
        <label className="block text-sm font-bold text-gray-700 flex items-center gap-2">
          <MessageCircle size={18} className="text-rose-500" />
          你想詢問的問題（可選）
        </label>
        <textarea 
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="例如：生活中感到有些迷惘，或是跟朋友相處上有了摩擦...（沒寫也沒關係，讓彩虹卡給當下的你一點指引吧！）"
          className="w-full p-4 rounded-xl border border-rose-200 focus:ring-2 focus:ring-rose-200 focus:border-rose-300 transition-all outline-none resize-none h-24 bg-white/60 text-gray-700 placeholder:text-gray-400"
        />
        <div className="flex gap-2 text-xs text-rose-700 bg-white/50 p-3 rounded-lg font-medium">
          <Info size={14} className="shrink-0 mt-0.5 text-rose-500" />
          <p>小提醒：問題越具體，聚焦在「我可以做什麼」或「我如何看待」，解讀會越有力量。</p>
        </div>
      </div>

      {/* Count Selection - CHANGED to Light Purple */}
      <div className="bg-purple-100 p-6 rounded-2xl shadow-md border-2 border-purple-300 space-y-4 transform hover:scale-[1.01] transition-transform duration-300">
        <label className="block text-sm font-bold text-gray-700 flex items-center gap-2">
          <RefreshCw size={18} className="text-green-500" />
          選擇抽卡數量
        </label>
        <div className="grid grid-cols-2 gap-4">
          <button 
            onClick={() => setCardCount(1)}
            className={`p-4 rounded-xl border-2 transition-all flex flex-col items-center gap-2 ${cardCount === 1 ? 'border-orange-400 bg-orange-50 text-orange-700 shadow-sm' : 'border-gray-300 hover:border-orange-200 text-gray-500 bg-white/60'}`}
          >
            <span className="text-xl font-bold">單張牌</span>
            <span className="text-xs">當下指引 / 每日靈感</span>
          </button>
          <button 
            onClick={() => setCardCount(5)}
            className={`p-4 rounded-xl border-2 transition-all flex flex-col items-center gap-2 ${cardCount === 5 ? 'border-orange-400 bg-orange-50 text-orange-700 shadow-sm' : 'border-gray-300 hover:border-orange-200 text-gray-500 bg-white/60'}`}
          >
            <span className="text-xl font-bold">五張牌</span>
            <span className="text-xs">完整排陣 / 深度探索</span>
          </button>
        </div>
      </div>

      {/* Manual Input Fields */}
      {mode === 'manual' && (
        <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-sm space-y-6 border border-white/50">
          <h3 className="font-medium text-gray-700 border-b pb-2">卡片內容</h3>
          {Array.from({ length: cardCount }).map((_, idx) => (
            <div key={idx} className="flex gap-3 items-start animate-fade-in">
              <span className="mt-3 text-gray-400 font-mono text-sm">0{idx + 1}</span>
              <div className="flex-1 space-y-2">
                <select 
                  value={manualInputs[idx].color}
                  onChange={(e) => {
                    const newInputs = [...manualInputs];
                    newInputs[idx] = { ...newInputs[idx], color: e.target.value };
                    setManualInputs(newInputs);
                  }}
                  className="w-full p-2 rounded-lg border border-gray-200 text-sm bg-white/50"
                >
                  {Object.entries(COLOR_MAP).map(([key, val]) => (
                    <option key={key} value={key}>{val.name} ({val.meaning.split('、')[0]}...)</option>
                  ))}
                </select>
                <input 
                  type="text"
                  value={manualInputs[idx].text}
                  onChange={(e) => {
                    const newInputs = [...manualInputs];
                    newInputs[idx] = { ...newInputs[idx], text: e.target.value };
                    setManualInputs(newInputs);
                  }}
                  placeholder="請輸入卡片上的文字..."
                  className="w-full p-2 rounded-lg border border-gray-200 text-sm bg-white/50"
                />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex gap-4 pt-4">
        <button 
          onClick={() => setView('home')}
          className="flex-1 py-3 text-orange-600 border border-orange-200 bg-orange-50 hover:bg-orange-100 rounded-xl transition-colors font-medium flex items-center justify-center gap-2"
        >
          <ArrowRight className="rotate-180 w-4 h-4" /> 返回
        </button>
        <button 
          onClick={mode === 'draw' ? handleDraw : handleManualSubmit}
          className="flex-[2] py-3 bg-gray-800 text-white rounded-xl shadow-lg hover:bg-gray-700 hover:scale-[1.02] transition-all flex items-center justify-center gap-2"
        >
          {mode === 'draw' ? <><Sparkles size={18} /> 開始抽卡</> : <><Check size={18} /> 完成輸入</>}
        </button>
      </div>

      {isFlipping && (
        <div className="fixed inset-0 bg-white/80 backdrop-blur-sm z-50 flex flex-col items-center justify-center">
          <div className="animate-spin text-orange-400 mb-4"><RefreshCw size={48} /></div>
          <p className="text-gray-600 font-medium animate-pulse">正在連結你的能量...</p>
        </div>
      )}
    </div>
  );

  const renderResult = () => (
    <div className="max-w-4xl mx-auto w-full animate-fade-in pb-20 relative z-10">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <button 
          onClick={() => setView('home')} 
          className="group flex items-center gap-2 px-5 py-2.5 bg-white border-2 border-orange-100 rounded-full shadow-md hover:shadow-lg hover:border-orange-300 transition-all text-gray-700 hover:text-orange-600"
        >
          <div className="bg-orange-100 rounded-full p-1 group-hover:bg-orange-200 transition-colors">
            <ArrowRight className="rotate-180 w-4 h-4" />
          </div>
          <span className="font-bold">回首頁</span>
        </button>
        <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
          <Sun className="text-orange-400" size={20} />
          你的彩虹卡解讀
        </h2>
        <div className="w-24"></div> 
      </div>

      {/* Cards Display */}
      <div className={`
        flex gap-4 mb-12 perspective-1000
        ${cardCount === 5 
          ? 'overflow-x-auto pb-6 px-4 -mx-4 snap-x md:flex-wrap md:justify-center md:overflow-visible md:px-0 md:mx-0' 
          : 'flex-wrap justify-center'}
      `}>
        {drawnCards.map((card, index) => (
          <div key={card.id} className={`flex flex-col items-center gap-3 animate-slide-up ${cardCount === 5 ? 'snap-center flex-shrink-0' : ''}`} style={{ animationDelay: `${index * 150}ms` }}>
             {cardCount === 5 && (
               <span className="text-xs text-gray-400 uppercase tracking-wider font-medium">
                 {['核心本質', '內在調整', '行動方向', '外部提醒', '整體建議'][index]}
               </span>
             )}
            <Card 
              color={card.color} 
              text={card.text}
              textEn={card.textEn}
              isFlipped={true} 
              size={cardCount === 5 ? 'small' : 'normal'}
              onClick={() => {
                if (cardCount === 5) {
                  setZoomedCard(card);
                }
              }}
            />
            <ColorBadge color={card.color} />
          </div>
        ))}
      </div>

      {/* Interpretation Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Left Column */}
        <div className="md:col-span-2 space-y-8">
          
          {/* 1. Static Key Points */}
          <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-sm border border-orange-100">
            <h3 className="font-bold text-gray-800 text-lg mb-4 flex items-center gap-2">
              <Feather size={20} className="text-orange-400" />
              卡片指引重點
            </h3>
            <div className="space-y-6">
              {drawnCards.map((card, idx) => (
                <div key={card.id} className="border-b border-gray-100 last:border-0 pb-4 last:pb-0">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded">Card {idx + 1}</span>
                    <span className={`text-sm font-bold ${COLOR_MAP[card.color].text}`}>
                      {COLOR_MAP[card.color].meaning.split('、')[0]}能量
                    </span>
                  </div>
                  <p className="text-gray-700 font-medium mb-1">{card.text}</p>
                  {card.textEn && <p className="text-gray-400 text-sm font-serif italic mb-1">{card.textEn}</p>}
                </div>
              ))}
            </div>
          </div>

          {/* 2. Deep AI Interpretation */}
          <div className="bg-gradient-to-br from-white to-orange-50 p-6 rounded-2xl shadow-sm border border-orange-200 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10 text-orange-400"><Bot size={64}/></div>
            
            <h3 className="font-bold text-gray-800 text-lg mb-4 flex items-center gap-2 relative z-10">
              <Sparkles size={20} className="text-purple-500" />
              深層心靈指引
            </h3>
            
            {isAiLoading ? (
              <div className="flex flex-col items-center justify-center py-8 space-y-3">
                 <div className="w-8 h-8 border-4 border-orange-200 border-t-orange-500 rounded-full animate-spin"></div>
                 <p className="text-sm text-gray-500 animate-pulse">AI 正在感受您的能量場並撰寫解讀中...</p>
              </div>
            ) : (
              <div className="animate-fade-in relative z-10 whitespace-pre-wrap leading-relaxed text-gray-700">
                {aiInterpretation}
              </div>
            )}
          </div>

          {/* 3. Chat Interface */}
          <ChatInterface drawnCards={drawnCards} />
        </div>

        {/* Right Column */}
        <div className="space-y-4">
          <div className="bg-orange-50/80 backdrop-blur-sm p-6 rounded-xl border border-orange-100 h-fit sticky top-6">
             <h4 className="font-bold text-orange-800 text-lg mb-3 flex items-center gap-2">
               <Coffee size={18} />
               給你的小練習
             </h4>
             <p className="text-sm text-orange-700 leading-relaxed">
               選一句你最有感覺的句子，今天在心中默念三次。那是宇宙送給你今天的禮物。<br/><br/>
               或許你可以將它寫在便利貼上，貼在電腦螢幕旁或鏡子上，讓這份能量陪伴你一整天。
             </p>
             <div className="mt-4 flex justify-end text-orange-300">
               <Smile size={24} />
             </div>
          </div>
        </div>
      </div>

      {/* Zoom Modal - FIXED */}
      {zoomedCard && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-fade-in p-4"
          onClick={() => setZoomedCard(null)}
        >
          <div className="relative transform transition-all animate-slide-up flex flex-col items-center max-h-[85vh] w-full max-w-lg" onClick={e => e.stopPropagation()}>
            <button 
              onClick={() => setZoomedCard(null)}
              className="absolute -top-12 right-0 bg-white/20 text-white rounded-full p-2 hover:bg-white/40 z-10 backdrop-blur-sm"
            >
              <X size={24} />
            </button>
            <Card 
              color={zoomedCard.color} 
              text={zoomedCard.text}
              textEn={zoomedCard.textEn}
              isFlipped={true} 
              size="normal" 
              isZoomed={true}
            />
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-[#FDFBF7] font-sans selection:bg-orange-100 text-gray-800 relative">
      <BackgroundDecorations />
      
      {/* Navbar */}
      <nav className="relative z-10 px-6 py-6 flex justify-between items-center max-w-5xl mx-auto">
        <div 
          onClick={() => setView('home')}
          className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity"
        >
          <div className="w-8 h-8 bg-gradient-to-br from-orange-400 to-rose-400 rounded-lg flex items-center justify-center text-white shadow-md flex-shrink-0">
            <Sun size={18} />
          </div>
          
          {/* Rotating Title */}
          <div className="h-6 overflow-hidden flex flex-col justify-center">
             <span key={titleIndex} className="font-bold text-gray-700 tracking-tight flex items-center gap-1 animate-slide-up">
                {WARM_PHRASES[titleIndex]} <Heart size={16} className="text-rose-400 fill-rose-400" />
             </span>
          </div>
        </div>
        
        {/* Removed About Link */}
      </nav>

      {/* Main Content */}
      <main className="relative z-10 px-6 py-8 max-w-5xl mx-auto min-h-[85vh] flex flex-col">
        {view === 'home' && renderHome()}
        {view === 'draw_setup' && renderSetup('draw')}
        {view === 'manual_setup' && renderSetup('manual')}
        {view === 'result' && renderResult()}
      </main>

      {/* Footer */}
      <footer className="relative z-10 py-8 text-center text-gray-400 text-xs">
        <p>© 2026 Rainbow Card Sanctuary. Designed with Warmth.</p>
        <p className="mt-1 opacity-50">彩虹卡原創者：Doris Wenzel</p>
      </footer>

      {/* Global Styles for Animations */}
      <style>{`
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-12px); }
          100% { transform: translateY(0px); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .animate-float-delay {
          animation: float 6s ease-in-out infinite;
          animation-delay: 2s; /* Delay for the second card */
        }
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slide-up {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.6s ease-out forwards;
        }
        .animate-slide-up {
          animation: slide-up 0.5s ease-out forwards;
        }
        .preserve-3d {
          transform-style: preserve-3d;
        }
        .backface-hidden {
          backface-visibility: hidden;
        }
        .rotate-y-0 {
          transform: rotateY(0deg);
        }
        .rotate-y-180 {
          transform: rotateY(180deg);
        }
        /* Hide scrollbar for Chrome, Safari and Opera */
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        /* Hide scrollbar for IE, Edge and Firefox */
        .hide-scrollbar {
          -ms-overflow-style: none;  /* IE and Edge */
          scrollbar-width: none;  /* Firefox */
        }
      `}</style>
    </div>
  );
}