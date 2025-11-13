import React from 'react';

const Footer = ({completedTaskCount = 0, activeTaskCount = 0}) => {
  return <>
    {completedTaskCount + activeTaskCount > 0 &&(
      <div className="text-center">
        <p className="text-sm text-muted-foreground">
          {
            completedTaskCount > 0 && (
              <>
                You have completed {completedTaskCount}  
                  {
                    activeTaskCount > 0 &&`, just ${activeTaskCount} left`
                  }
              </>
            )
          }
              {completedTaskCount === 0 && activeTaskCount > 0 && (
                <>
                  Start working!
                </>
              )}
        </p>
      </div>
    )}
  </>;
};

export default Footer;