import React from 'react';

interface Section {
    color: string;
    percentage?: number;
    value?: number;
    maxValue?: number;
}

interface ProgressBarProps {
    sections: Section[];
    usePercentage?: boolean;
    maxValue?: number;
    defaultColor?: string;
    height?: 'small' | 'medium';
}

const heightStyles = {
    small: 'h-2',
    medium: 'h-3.5',
};

const ProgressBar: React.FC<ProgressBarProps> = ({
    sections,
    usePercentage = true,
    maxValue = 100,
    defaultColor = '#e0e0e0',
    height = 'small',
}) => {
    const totalFilled = usePercentage
        ? 100
        : sections.reduce((acc, section) => acc + (section.value ?? 0), 0);

    return (
        <div className={`flex w-full bg-gray-300 rounded-lg overflow-hidden ${heightStyles[height]}`}>
            {sections.map((section, index) => (
                <span
                    key={index}
                    className="h-full"
                    style={{
                        backgroundColor: section.color,
                        width: usePercentage
                            ? `${section.percentage ?? 0}%`
                            : `${((section.value ?? 0) / maxValue) * 100}%`,
                    }}
                />
            ))}
            {!usePercentage && totalFilled < maxValue && (
                <span
                    className="h-full"
                    style={{
                        backgroundColor: defaultColor,
                        width: `${((maxValue - totalFilled) / maxValue) * 100}%`,
                    }}
                />
            )}
        </div>
    );
};

export default ProgressBar;
