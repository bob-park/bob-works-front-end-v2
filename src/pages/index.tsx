// daisyui
import { Stats } from 'react-daisyui';

const Stat = Stats.Stat;

export default function Home() {
  return (
    <main>
      <div className="grid grid-cols-1 gap-10">
        <Stats className="shadow font-sans" horizontal>
          <Stats.Stat className="w-48">
            <Stat.Item variant="title">연차 개수</Stat.Item>
            <Stat.Item variant="value" className="text-primary">
              15
            </Stat.Item>
          </Stats.Stat>

          <Stats.Stat className="w-48">
            <Stat.Item variant="title">사용한 수</Stat.Item>
            <Stat.Item variant="value" className="text-secondary">
              6
            </Stat.Item>
          </Stats.Stat>

          <Stats.Stat className="w-48">
            <Stat.Item variant="title">남은 수</Stat.Item>
            <Stat.Item variant="value">9</Stat.Item>
          </Stats.Stat>
        </Stats>
        <Stats className="shadow font-sans" horizontal>
          <Stats.Stat className="w-48">
            <Stat.Item variant="title">대체 휴가 개수</Stat.Item>
            <Stat.Item variant="value" className="text-primary">
              7
            </Stat.Item>
          </Stats.Stat>

          <Stats.Stat className="w-48">
            <Stat.Item variant="title">사용한 수</Stat.Item>
            <Stat.Item variant="value" className="text-secondary">
              0.5
            </Stat.Item>
          </Stats.Stat>

          <Stats.Stat className="w-48">
            <Stat.Item variant="title">남은 수</Stat.Item>
            <Stat.Item variant="value">6.5</Stat.Item>
          </Stats.Stat>
        </Stats>
      </div>
    </main>
  );
}
