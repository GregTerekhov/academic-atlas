import { WorkTitle } from 'types';

import { AccordionUI } from 'ui';
import FAQItem from './fag-item';

interface IListTitle {
  title: WorkTitle;
}

export default function FAQList() {
  const listTitle: IListTitle[] = [
    { title: WorkTitle.Diplomas },
    { title: WorkTitle.TeamPapers },
    { title: WorkTitle.BachelorTheses },
    { title: WorkTitle.TestPapers },
    { title: WorkTitle.Abstracts },
    { title: WorkTitle.PracticalWorks },
  ];
  return (
    <>
      <p>FAQList</p>
      {Array.isArray(listTitle) &&
        listTitle.map(({ title }) => (
          <AccordionUI
            key={title}
            title={title}
          >
            <FAQItem workTitle={title} />
          </AccordionUI>
        ))}
    </>
  );
}
